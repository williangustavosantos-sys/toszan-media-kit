
  # Premium Interactive DJ Website

  This is a code bundle for Premium Interactive DJ Website. The original project is available at https://www.figma.com/design/kpWltLAiSbZr7SxUSU7jSa/Premium-Interactive-DJ-Website.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

## Future Instagram API Automation

The current `/analytics` page is intentionally manual: screenshots are exported from Instagram Professional Dashboard and stored under `public/analytics/YYYY-MM/`. This is the safest monthly workflow for a public media kit because it avoids token expiry, permission review delays, and API metric naming changes.

A future automated version can use the Instagram Graph API / Instagram Platform only if the account is a professional Instagram account and the app has the required permissions for insights. Meta documents the Insights API for professional accounts, and the relevant permissions include access to Instagram insights for the account linked to the page or professional login flow.

Requirements before automation:

- Meta developer app configured for Instagram Platform / Graph API.
- Instagram professional account access and the required insights permissions approved.
- A secure server-side job to fetch account and media insights.
- Long-lived token storage and refresh handling. Meta documents long-lived Instagram user access tokens as expiring after 60 days, so token refresh and owner re-authentication must be part of the runbook.
- A monthly validation step comparing API data against Instagram Professional Dashboard screenshots.

Risks:

- Token expiration or revoked permissions can break automated updates.
- Instagram metric names and availability can change.
- App review may be required before production use.
- API data should not replace screenshot proof unless the client asks for live verification.

Recommended workflow for now: update `src/data/creatorStats.ts` and add the new official screenshots to `public/analytics/YYYY-MM/` once per month.
  
