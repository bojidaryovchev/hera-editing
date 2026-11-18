# Manual QA record, 2026-11-19

- **What it is.** The keyboard pass and the accessibility-tree review that the spec asks for on top of the automated
  axe scans: spec/website/02 "Accessibility" ("automated axe _and_ manual keyboard and screen-reader checks") and
  website/04 H ("Screenshots at mobile/tablet/desktop and manual QA record"). It closes the keyboard half of spec
  review gap 1.5 ([`docs/spec-coverage.md`](../../docs/spec-coverage.md)).
- **Who did it, and how.**
  - Claude, an AI agent, pressed the keys a keyboard user presses: Tab, Shift+Tab, Enter, Space, Escape, and typing
    into fields. The keys went to Chromium 156 (Playwright 1.64.1), and every page was walked.
  - The walks ran on the end-to-end build of this commit. That build runs with `APP_ENV=test`, so it shows the
    fictional portfolio fixtures, the labelled stock footage and a test analytics id behind consent.
  - The script [`qa/keyboard.qa.ts`](../keyboard.qa.ts) (`pnpm qa:keyboard`) records what happens. The judgments
    below are Claude's, from the close-ups in [`focus/`](focus/) and the trees in [`aria/`](aria/).
- **Sizes.** Desktop at 1440×900, and phone width at 390×844 (the mobile layout, operated with a keyboard).
- **Still needed: a person with a screen reader.** Reading the accessibility tree shows what a screen reader receives,
  but not how it sounds in use. The steps are at the end.

## Results

**Every page, at both sizes.** There are 22 pages: the Bulgarian site with its portfolio fixtures, the English
section, and the 404 page.

- **The first stop.** The first Tab stop is the skip link («Към основното съдържание»; "Skip to the content"). Enter on
  it sends the next Tab into the content.
- **The focus ring.** Every stop shows one: lime on the dark sections, the focus blue on paper (see the close-ups in
  [`focus/`](focus/)).
- **Nothing hides the focus.** No stop is hidden under the sticky header or the cookie banner, in either direction,
  and none is off screen. The page's scroll padding keeps focused controls clear of the header.
- **The order.** Tab and Shift+Tab reach the same stops on every page (the counts are in
  [`summary.md`](summary.md)), so there are no dead ends and no traps. The order follows the page as it reads: the
  header, the content, then the footer.
- **Videos and questions.** Each video has its own play button in the order. The FAQ questions are native disclosure
  widgets, which open and close with Enter or Space.

**The phone menu.**

- Enter on «Отворете менюто» ("Open the menu") opens it with focus inside: 8 stops in Bulgarian, 7 in English.
- After the last control, focus passes to the browser's own controls, as a native modal dialog allows. It never goes
  to the page behind, which is inert, and the next Tab comes back into the menu.
- Escape closes the menu and returns focus to its button.

**The cookie banner,** shown only when analytics is configured:

- its three controls come right after the skip link, so a keyboard user meets it first;
- Enter on a button closes it, and the next Tab carries on with the header.

**The two forms, sent with the keyboard only.** These were the quote form (`/kontakti`) and the English order form
(`/en/order`). Typing filled the fields and chose the country, Space set the choices and the confirmation box, and
Enter on the send button sent each form. Both arrived, and focus moved to the thank-you heading.

**The accessibility trees,** read page by page, in [`aria/`](aria/):

- **Landmarks.** Every page has one banner, one main and one contentinfo. Each navigation has a name: the main
  navigation, the breadcrumb and the site map.
- **Headings.** Every page has one h1, and no heading level is skipped.
- **Names.** Every link, button, field and image has a name.
  - The two illustrations (the 12-week posting example and the time-zone day) are described in full.
  - The decorative parts of the editing timeline are hidden.
  - The form fields are named by their labels, and the grouped questions by their legends.
  - Each hint is attached to its field.
  - A link whose text repeats, such as «Вижте проекта», adds the project's name for screen readers.
- **Repeated names.** The repeated link names are the quote buttons, which all lead to the quote form. The copies in
  the package cards sit under each package's heading, so their purpose is clear in context.

## Issues found

Three issues were found, and all three are fixed (decision L42). The pass above ran on the fixed build.

1. **The email-or-phone pair flagged the phone too early.**
   - Leaving the email field empty marked the phone field invalid before the visitor reached it, so a screen reader
     announced the phone as invalid on arrival. The pair answers one question, «Как да се свържем с Вас?», whose hint
     says «Достатъчно е едно от двете.».
   - Now the pair's "neither given" error waits until the visitor has left both fields, or tries to send. Sending still
     shows every problem at once (L25).
   - Where: `src/components/contact/LeadForm.tsx`. Test: `tests/e2e/lead.spec.ts`, "email or phone".
2. **A date field's calendar button had no ring of the site's own.**
   - On the English order form's Deadline field, the calendar button inside the field showed only the browser's thin
     default box. While that button has focus, the field matches neither `:focus` nor `:focus-visible`, so the site's
     ring did not apply.
   - Date fields now take the site's ring through `:focus-within`.
   - Where: `src/app/globals.css` and `src/styles/form.css`.
3. **The breadcrumb separator was read aloud.**
   - Screen readers read the "/" between breadcrumb items, which CSS draws, as part of the next item: "/Контакти",
     "/Pricing".
   - The separator now has empty alternative text (`content: "/" / ""`), and looks the same.
   - Where: `src/styles/pages.css`. Test: `tests/e2e/navigation.spec.ts`, "breadcrumbs lead back up".

**Noted, not changed:**

- **The skip link.** After Enter on it, focus itself stays on the link, and the next Tab goes into the content.
  Chromium moves its sequential focus starting point; `main` is not focusable. Screen readers move their reading
  position with the link. The listen below includes it.
- **The cookie banner.** When it closes, focus rests on the page itself. The next Tab goes to the header's first link,
  so nothing is lost.
- **The phone menu.** After the menu's last control, focus passes to the browser's own toolbar, as a native modal
  dialog allows, and never to the page behind.
- **The radio choices.** In the accessibility tree, each choice's text appears twice: once as the radio's name and
  once as its text, because the label wraps both. Screen readers usually announce it once; the listen below will
  tell.
- **The package list.** The English package list groups its options (`<optgroup>`), which Playwright's tree snapshot
  leaves out. That is why `aria/en-order.yml` shows only "Choose a package". Screen readers read the groups.

## Files

- [`summary.md`](summary.md): the scenarios, and the number of Tab stops on each page in each direction.
- [`keyboard.json`](keyboard.json): every stop, with the role and name a screen reader announces, the focus style, and
  anything over the element.
- [`focus/`](focus/): close-ups of the first control of each kind, at each size, and of every stop that looked wrong.
- [`aria/`](aria/): the accessibility tree of each page at desktop size, as assistive technology receives it.

The full-page screenshots at the seven review widths are made on demand, and are not kept in Git because of their
size: `SCREENSHOTS=1 pnpm test:e2e responsive` writes them to `qa/screenshots/full/`.

## The screen-reader listen (for a person, about 20 minutes)

Use your own phone, or a Windows PC. Nothing here sends an enquiry.

1. **Turn the screen reader on.**
   - iPhone: Settings → Accessibility → VoiceOver.
   - Android: Settings → Accessibility → TalkBack.
   - Windows: NVDA, free from nvaccess.org, with Chrome or Firefox.
2. **Open hera-editing.com, then go through the homepage from the top:** swipe right on a phone, or press the down
   arrow in NVDA. Check that:
   - every heading, button and link says what it does;
   - pictures and decorations are either described or skipped;
   - the moving parts (the editing timeline, the playhead) never interrupt the reading.
3. **Open the menu and go to «Контакти».** Press «Изпратете запитването» with the form empty. Check that you hear that
   something is missing and which field it is, and that you land on that field.
4. **Fill one field, then leave the page without sending.**
5. **Repeat steps 2 and 3 on hera-editing.com/en and /en/order** (in English).
6. **Write down anything that was hard, slow or unclear,** and send it to Claude.
