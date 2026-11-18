"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_LOGIN_RULES,
  adminConfig,
  createSession,
  destroySession,
  passwordMatches,
  requireAdmin,
} from "@/lib/admin/auth";
import { field } from "@/lib/admin/format";
import { auditReply, getLead, isLeadStatus, setLeadStatus } from "@/lib/admin/leads";
import { replySetup } from "@/lib/admin/mail";
import { getServerEnv } from "@/lib/config/env";
import { getDb } from "@/lib/db/client";
import { errorCode, logEvent } from "@/lib/log";
import { replyToLead, replyToThread } from "@/lib/mailbox/reply";
import { getThread, setThreadStatus } from "@/lib/mailbox/store";
import { consumeRateLimit } from "@/lib/rate-limit";
import { clientAddress, rateLimitSubject } from "@/lib/security/request";

/*
 * The admin panel's actions (decision L32). Every one except signing in checks the session itself: a layout guards
 * the pages, not the actions they render, and an action is a public POST endpoint.
 */

export type FormState = { tone: "ok" | "error" | null; message: string; at?: number };

export async function loginAction(_prev: FormState, form: FormData): Promise<FormState> {
  const config = adminConfig();
  if (!config) return { tone: "error", message: "Панелът не е включен." };
  let env, db;
  try {
    env = getServerEnv();
    db = getDb();
  } catch {
    return { tone: "error", message: "Панелът не е достъпен в момента. Опитайте след малко." };
  }

  const subject = rateLimitSubject(clientAddress(await headers(), env.trustProxy), env.rateLimitSalt, new Date());
  try {
    const decision = await consumeRateLimit(db, subject, ADMIN_LOGIN_RULES);
    if (!decision.allowed) {
      logEvent("warn", "admin_login_limited");
      const minutes = Math.max(1, Math.ceil(decision.retryAfterSeconds / 60));
      return { tone: "error", message: `Твърде много опити. Опитайте отново след ${minutes} мин.` };
    }
  } catch (error) {
    logEvent("error", "admin_login_failed", { code: errorCode(error) });
    return { tone: "error", message: "Панелът не е достъпен в момента. Опитайте след малко." };
  }

  if (!passwordMatches(field(form, "password", 200), config.password, config.sessionSecret)) {
    logEvent("warn", "admin_login_rejected");
    return { tone: "error", message: "Грешна парола." };
  }
  await createSession();
  logEvent("info", "admin_login");
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin/vhod");
}

export async function setLeadStatusAction(form: FormData): Promise<void> {
  await requireAdmin();
  const id = field(form, "leadId");
  const status = field(form, "status");
  if (!isLeadStatus(status)) redirect(`/admin/zapitvaniya/${id}`);
  await setLeadStatus(getDb(), id, status);
  revalidatePath("/admin", "layout");
  redirect(`/admin/zapitvaniya/${id}?saved=1`);
}

export async function setThreadStatusAction(form: FormData): Promise<void> {
  await requireAdmin();
  const id = field(form, "threadId", 8);
  const status = field(form, "status");
  if (/^[0-9A-F]{8}$/.test(id) && (status === "open" || status === "done")) {
    await setThreadStatus(getDb(), id, status);
    revalidatePath("/admin", "layout");
  }
  redirect(`/admin/poshta/${id}`);
}

export async function replyThreadAction(_prev: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const setup = replySetup();
  if (!setup.ok) return { tone: "error", message: setup.error };
  const db = getDb();
  const threadId = field(form, "threadId", 8);
  const result = await replyToThread(db, setup.mailer, setup.config, threadId, field(form, "body", 20_000));
  if (!result.ok) return { tone: "error", message: result.error };
  const thread = await getThread(db, threadId);
  await auditReply(db, thread?.leadId ?? null, threadId);
  logEvent("info", "admin_reply", { status: "sent" });
  revalidatePath("/admin", "layout");
  return { tone: "ok", message: "Отговорът е изпратен.", at: Date.now() };
}

export async function replyLeadAction(_prev: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const setup = replySetup();
  if (!setup.ok) return { tone: "error", message: setup.error };
  const db = getDb();
  const lead = await getLead(db, field(form, "leadId"));
  if (!lead) return { tone: "error", message: "Запитването не е намерено." };
  const result = await replyToLead(db, setup.mailer, setup.config, lead, field(form, "body", 20_000));
  if (!result.ok) return { tone: "error", message: result.error };
  await auditReply(db, lead.id, result.threadId);
  logEvent("info", "admin_reply", { status: "sent" });
  revalidatePath("/admin", "layout");
  return { tone: "ok", message: "Отговорът е изпратен.", at: Date.now() };
}
