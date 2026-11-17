import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/*
 * What the first load of a page may not pull in (Lighthouse, acceptance G). Each of these once cost points:
 * Zod's 64 interface translations rode along with the contact form (341 KB unminified), Zod and the schema loaded
 * before the form could paint, and GSAP ran before the homepage's first frame.
 */
const source = (file: string) => readFileSync(path.resolve(import.meta.dirname, "../../src", file), "utf8");

describe("first-load boundaries", () => {
  it("the Zod wrapper exposes named builders only, never Zod's namespace (which carries every translation)", async () => {
    const { z } = await import("../../src/lib/validation/zod");
    expect(z).not.toHaveProperty("locales");
    expect(source("lib/validation/zod.ts")).not.toMatch(/import \{ z \} from "zod"|import \* as z from "zod"/);
  });

  it("the quote form imports no Zod code up front: only types from the schema, values from lead-fields", () => {
    const form = source("components/contact/LeadForm.tsx");
    expect(form).not.toMatch(/^import \{[^}]*\} from "@\/lib\/validation\/lead";/m);
    expect(form).not.toMatch(/from "@hookform\/resolvers\/zod"/);
    expect(form).toMatch(/import\("@\/lib\/validation\/lead"\)/);
    expect(source("lib/validation/lead-fields.ts")).not.toMatch(/^import /m);
  });

  it("the homepage loads GSAP on demand, never as a static import", () => {
    const motion = source("components/home/HomeMotion.tsx");
    expect(motion).not.toMatch(/^import [^;]*from "gsap/m);
    expect(motion).toMatch(/import\("gsap"\)/);
  });
});
