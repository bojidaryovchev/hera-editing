# Hera Editing

The website of Hera Editing, a Bulgarian agency that runs businesses' social media month after month: strategy,
filming on site, editing, publishing after the client's approval, and reporting. Bulgarian, for business owners.

**Status (2026-11-18):** live in staging mode at **https://hera-editing.com** (noindex, with the staging bar) on Vercel
and Neon in Frankfurt, with the admin panel (`/admin`) and the `contact@hera-editing.com` mailbox. Production waits for
the owner's launch inputs: [docs/release-checklist.md](docs/release-checklist.md).

## Where things are

| Path                                                                 | What it holds                                                                                                                                                            |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [docs/strategy.md](docs/strategy.md)                                 | The core business, filming in Bulgaria: offer, customers, positioning, how clients find us, which pages to build                                                         |
| [docs/strategy-remote-editing.md](docs/strategy-remote-editing.md)   | The second line, remote editing for clients abroad: segments, countries, packages and prices, channels, the English pages, a 12-week roadmap                             |
| [docs/sales-kit-remote-editing.md](docs/sales-kit-remote-editing.md) | Ready-to-use texts for the second line: Fiverr gigs, YTJobs and outreach templates, client messages, the brief form, sample briefs                                       |
| [docs/decisions.md](docs/decisions.md)                               | Every decision since the specification: the owner's choices, then the build (decision 1–12, L1–L37)                                                                      |
| [docs/development.md](docs/development.md)                           | Running, configuring, deploying and operating the site                                                                                                                   |
| [docs/release-checklist.md](docs/release-checklist.md)               | Each acceptance criterion with its proof, and what the owner still has to supply                                                                                         |
| [docs/research/](docs/research/)                                     | Research after the freeze: measured keywords (05), competitors' service terms (06), the business research behind the strategy (07), and the remote-editing research (08) |
| [spec/](spec/)                                                       | The frozen v1.0 specification (research, product, website, handoff); checksummed, never edited                                                                           |
| `src/`, `tests/`, `scripts/`                                         | The site, its unit, integration and end-to-end tests, and the operator commands                                                                                          |

## Quick start

```sh
pnpm install
pnpm db:dev                # a local Postgres; prints the DATABASE_URL to use
cp .env.example .env.local # then fill DATABASE_URL
pnpm db:migrate
pnpm dev                   # http://localhost:3000
pnpm test                  # unit and integration
pnpm test:e2e              # end-to-end on a production build
```

Everything else (settings, deployment, the admin panel, data requests, backups) is in
[docs/development.md](docs/development.md).
