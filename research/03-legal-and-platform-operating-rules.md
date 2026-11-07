# Legal, publishing, and operational constraints (non-legal-advice research)

**Important:** This document turns observed requirements into product controls, not a claim of legal compliance. A Bulgarian privacy/IP lawyer and accountant should review real policies, contracts, rights and VAT status before launch.

## 1. Website lead forms / privacy
EU GDPR covers identifiable names, personal email addresses, phone numbers, website analytics identifiers and identifiable audiovisual material. Privacy notices must identify controller, purpose, legal basis, retention, recipient categories, rights and contact method. Do not treat generic 'I accept' as a universal lawful basis. A clear link/acknowledgement can be distinct from optional direct-marketing consent. No marketing opt-in required to submit a quote request.
- EU Commission GDPR application: https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/application-gdpr_en
- EU Commission information requirements: https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/obligations_en
- EDPB photos/video as personal data: https://www.edpb.europa.eu/sme/learn-the-basics/data-protection-basics_en

**Implementation rules:** minimize fields; encrypt in transit; restrict DB access; use auditable deletion/export process; document a retention period and exact legal basis with counsel. Do not send submitted data to marketing systems by default. Form anti-abuse must be privacy-aware. Suppress sensitive form content in exception telemetry and client analytics.

## 2. Analytics and cookies
- If GA4/Google marketing tags are added, non-essential storage and collection must be managed with suitable consent; Google offers basic consent mode that blocks tag loading before a choice. Implementation and choice design need legal review. Official docs: https://support.google.com/analytics/answer/14009635?hl=en and https://support.google.com/analytics/answer/13802165?hl=en
- In v1, implement consent **infrastructure and settings UI**. Keep optional analytics disabled until site owner supplies measurement IDs and approves compliant policy/CMP configuration. Essential functions and lead form work regardless of tracking preference. Do not inject advertising pixels by default.
- Keep 'Reject optional', 'Accept selected/optional', and 'Settings' accessible; no dark patterns.

## 3. Filming people and locations
Photos, voice and video with identifiable individuals are personal data; filming and publishing require a valid legal basis and, depending on context, image/personality/property permissions and appropriate notices. **Do not assume consent is always the sole lawful basis** or that entering premises authorizes an advertising shoot.
Operational checklist per shoot:
1. Client confirms authorization to film location, merchandise, logos, employees, customers and third-party materials.
2. Identify who can be filmed; obtain and record appropriate releases/notices where needed, especially for identifiable customers and minors.
3. Avoid capturing bystanders who have not been cleared; reshoot/blur or exclude.
4. Specify raw footage custody, access, retention, deletion after termination, and whether agency can reuse work in its own portfolio.
5. Client approves final media and legally sensitive claims before publishing.
6. Extra care in medical, financial, regulated, alcohol-related or other advertising-restricted categories; review platform and Bulgarian rules before any promise.

## 4. Copyright and music
- EU IP guidance: photographs, audiovisual edits, text and music can be copyrighted; attribution alone does not guarantee permission. https://intellectual-property-helpdesk.ec.europa.eu/news-events/news/intellectual-property-and-social-media-2020-01-23_en
- TikTok states commercial brand content should use commercial-cleared music; its general music catalogue may not grant commercial promotional rights. https://support.tiktok.com/en/business-and-creator/creator-and-business-accounts/commercial-use-of-music-on-tiktok
**Operational decision:** use original audio or media with explicit, documented platform/territory/commercial-use rights; per-platform licensing verification before cross-posting. Do not promise that trendy songs may legally be used for every business.

## 5. Account access / ownership
The **business retains ownership** of social pages, accounts, domains, ad accounts, original follower relationships and customer information. Use role-based delegated platform access where supported; never ask for personal passwords in a marketing website form or require password sharing. 2FA and least-privilege accounts mandatory. Keep platform permissions, authorized publishing and revocation/offboarding checklists. Google Business Profile explicitly supports manager roles without sharing passwords: https://support.google.com/business/answer/3403100?hl=en . Meta/TikTok exact roles and automation permissions must be verified in client onboarding because product interfaces change.

## 6. Definition of 'end-to-end' and limits
Core monthly scope is: initial strategy, content plan, on-site shoot(s), editing, subtitles, captions, asset adaptation, scheduled publication after approval, basic comments monitoring within agreed response window (if selected), KPI summary and monthly review. NOT automatically: ad spend, paid ads management, private inbox sales support, weekend/overnight coverage, crisis PR, influencer deals, talent actors, model releases handled without client cooperation, website SEO, content produced without access, or guaranteed business results.

## 7. Client contract must address
Scope/deliverable counts, channels and location; shoot hours, rescheduling/weather; content sign-off and deemed approval policy (do **not** auto-publish without agreed rules); revision rounds; payment timing/cancellation; VAT statement; usage and intellectual property licensing; agency portfolio reuse permission; confidentiality; raw material and account-access return; data processing roles and DPA if applicable; breach/escalation procedures; third-party music stock; paid ad exclusions; attribution limitations; client responsibilities; abuse/unlawful content refusal; no outcome guarantee.

## 8. Website legal page launch gates
- Authentic legal entity and trade name; legal contact information.
- Bulgarian privacy notice describing actual hosting/email/analytics/processors and retention.
- Cookie policy and working preferences for services actually loaded; no false cookie declaration.
- Terms only where reviewed and appropriate; do not fabricate boilerplate as 'legally compliant'.
- Test privacy rights contact and data deletion process.

## 9. Quote proposal caveats
Prices in EUR. The euro has been the national currency since 2026-01-01; the mandatory dual price display period ended 2026-08-08. https://economy-finance.ec.europa.eu/euro/eu-countries-and-euro/bulgaria-and-euro_en . Indicate VAT inclusion/exclusion based on actual company status and applicable requirements. A quote must show travel, number of shoots, number of **unique** videos vs cross-platform republishes, formats, channel count, moderation and revision limits.
