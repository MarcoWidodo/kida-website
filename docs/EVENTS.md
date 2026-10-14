# Updating KIDA events

Use the separate **KIDA Event Review** Google Sheet.

1. Add or edit a row on **Events**.
2. Keep new records **Pending** while checking development relevance and student access.
3. Set complete, verified entries to **Approved** to publish them.
4. Set entries to **Withdrawn** or **Rejected** to remove them.

Use stable lowercase event IDs with hyphens. Required public fields are ID, title, calendar date, description, and official source URL. Leave unknown times blank. Times use the America/Los_Angeles timezone; include an end date for multi-day events.

The **PublicFeed** tab contains formulas for Events rows 2–1000. It exposes approved public fields and excludes review notes, eligibility evidence, relevance rationale, and verification metadata. Edit Events rather than PublicFeed. Publish only PublicFeed to the web as CSV, with automatic republishing enabled.

The Vercel EVENTS_SHEET_CSV_URL environment variable holds that public CSV URL. GET /api/events validates and normalizes records, excludes unsafe links and nonpublic fields, and caches successful responses for one minute. Google may take a few minutes to republish spreadsheet changes.

The website refreshes while visible, on focus, and once per minute. It retains its last successful archive during a temporary feed failure. New visitors initially see the verified archive bundled with the deployment; a failed live refresh shows a retry notice on Events.

Event pages use /events/<stable-id> links. Filters use q, org, topic, and when query parameters.

## Source selection

The launch archive includes five user-confirmed KIDA events, all eight King Center Student Events listings in September 2025–August 2026 (merging two overlaps), and selected development-related Stanford events. Verified upcoming listings are also included.

KIDA's relationship is distinct from the host organization. Shared opportunities must not be described as KIDA-hosted events. Department affiliation alone does not establish development relevance. Invitation-only or unclear-audience events remain unpublished until eligibility is verified.

No recurring collection job is configured. Refresh candidate research on request.

## Validation

Run node --test tests/events.test.mjs and npm run build before deployment. Check the live /api/events response, mobile layouts, event details, external links, theme changes, and reduced motion.

Vercel is linked to the existing kida-website project. Preview deployments do not change the domain; a production deployment updates the existing www and apex aliases.
