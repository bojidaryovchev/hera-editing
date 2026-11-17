import { config, email, enum as enumOf, literal, object, preprocess, string, uuid } from "zod";

// The site's CSP allows no eval. Zod 4 probes for it with `new Function` to compile faster parsers; the browser
// reports that probe as a policy violation even though Zod catches it. Jitless mode skips the probe (and the
// compiled path, which a form this small does not need). Schemas must import `z` from here so this runs first.
config({ jitless: true });

// Named imports gathered into a small `z`, never Zod's own namespace: re-exporting that kept all 64 of Zod's
// interface translations (341 KB) in the contact page's script, because a bundler cannot trim an object that is
// passed around. Add a builder here when a schema needs one.
export const z = { config, email, enum: enumOf, literal, object, preprocess, string, uuid };
export type { output as ZodOutput, ZodType } from "zod";
