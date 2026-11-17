import { z } from "zod";

// The site's CSP allows no eval. Zod 4 probes for it with `new Function` to compile faster parsers; the browser
// reports that probe as a policy violation even though Zod catches it. Jitless mode skips the probe (and the
// compiled path, which a form this small does not need). Schemas must import `z` from here so this runs first.
z.config({ jitless: true });

export { z };
