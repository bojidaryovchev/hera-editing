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

describe("first-load boundaries of the English section (decision L38)", () => {
  it("the order form imports no Zod code up front: types from the schema, values from order-fields", () => {
    const form = source("components/en/OrderForm.tsx");
    expect(form).not.toMatch(/^import \{[^}]*\} from "@\/lib\/validation\/order";/m);
    expect(form).not.toMatch(/from "@hookform\/resolvers\/zod"/);
    expect(form).not.toMatch(/from "@\/lib\/validation\/(zod|text|lead)"/);
    expect(form).toMatch(/import\("@\/lib\/validation\/order"\)/);
    expect(source("lib/en/order-fields.ts")).not.toMatch(/^import /m);
    expect(source("lib/leads/order-form.ts")).not.toMatch(/^import \{[^}]*\} from "@\/lib\/validation/m);
  });

  it("the English pages load GSAP on demand, and never the Bulgarian homepage's motion", () => {
    const motion = source("components/en/EnMotion.tsx");
    expect(motion).not.toMatch(/^import [^;]*from "gsap/m);
    expect(motion).toMatch(/import\("gsap"\)/);
    for (const page of ["app/(en)/en/page.tsx", "components/en/NichePage.tsx", "app/(en)/en/how-it-works/page.tsx"])
      expect(source(page), page).not.toMatch(/HomeMotion|components\/home\//);
  });

  it("the pricing data the browser receives (analytics, order form) has no imports of its own", () => {
    expect(source("content/en/packages.ts")).not.toMatch(/^import (?!type)/m);
  });

  it("next.config.ts loads the English gates through relative imports only (the config loader has no @/ paths)", () => {
    for (const file of [
      "lib/en/release.ts",
      "lib/site/release-error.ts",
      "content/en/terms.ts",
      "content/en/legal/privacy.ts",
    ])
      expect(source(file), file).not.toMatch(/^import (?!type)[^;]*from "@\//m);
  });
});
