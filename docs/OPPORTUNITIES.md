# Maintaining opportunities

Use the private [KIDA Opportunities editor](https://docs.google.com/spreadsheets/d/1ds3WQPZ7ZScWiA3wxcBmWNwumHxHOzR_O7KAERtewt8/edit).

1. Add or edit a row on Opportunities. Keep candidates Pending during review.
2. Verify a substantive development connection and Stanford undergraduate eligibility from the official source. Record the evidence in the private review columns.
3. Separate actual vacancies from Program guides. Open means a current application route is explicitly available. Upcoming means the organizer has announced a forthcoming cycle. Explore program does not imply an open application.
4. Set Status to Approved and Undergraduate eligible to Yes or Some undergraduates. Other eligibility values are excluded from PublicFeed even when the row is approved.
5. Use real spreadsheet dates, preserving unknown deadlines as blank. Expires on is a validity guard, not an application deadline. Refresh Verified on only after checking the source.
6. Withdraw or reject outdated or unsuitable records; preserve stable IDs for existing records.

Only PublicFeed is published as CSV. It covers rows 2–1000 and omits editorial evidence and review notes. The server-only OPPORTUNITIES_SHEET_CSV_URL variable connects it to GET /api/opportunities. Approved edits refresh without redeployment; Google may take a few minutes to republish.

The site closes listings after their deadline or expiry date and hides closed records by default. An Open record without a verification date, or last verified more than 30 days ago, becomes Check availability. Program guides keep their explicit labels.

## Systematic source review

The Sources tab records official pages, selection rules, expiry checks, and suggested review cadences. King Center, SIEPR, SIG, FSI, Global Studies, Human Rights, Haas, African Studies, and UN Volunteers are the initial source groups.

No documented official opportunity API or feed was verified during this pass. Run npm run review:opportunities to compare official source pages with a local previous snapshot and produce a review queue in .review/. This detects source changes and candidate links; it does not determine eligibility or publish records. There is no scheduled collection job or automatic approval.

Confirm a project-level call's deadline, undergraduate standing, skills, location, visa/work restrictions when stated, and the actual host's development relevance before promoting it. Never infer a new application cycle from a reused URL or promote a PhD-only role to undergraduates.

## Website interaction

The Map and List views use the same records and filters. Department nodes filter their matching listings. Filters and direct details links are preserved in the URL. Current filters are q, type, location, topic, org, availability, and view.

Validate with node --test tests/*.test.mjs and npm run build. Check the live endpoint, map/list filtering, keyboard controls, mobile navigation, and direct details routes after deployment.
