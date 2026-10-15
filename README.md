# Stanford KIDA

A restrained editorial website for the King International Development Association.

- React 18, Vite 5, and React Router.
- Source Serif 4, white, black, and cardinal red.
- Accessible ambient SVG motion, tactile controls, and a light default theme.
- A verified event archive with filters, hover previews, native detail dialogs, and direct links.
- Automatic approved-event updates from a separate Google Sheet.

## Development

Run npm install, then npm run dev. Use npm run build for the production bundle.

The optional server-only EVENTS_SHEET_CSV_URL variable enables the same event endpoint in local development. Never prefix it with VITE_.

See [event maintenance](docs/EVENTS.md) for the editorial workflow. Source asset originals are preserved; optimized copies live under public/assets.

The Opportunities page has a separate approval editor, undergraduate eligibility gates, automatic expiry, and Map/List views. See [opportunity maintenance](docs/OPPORTUNITIES.md). Tools is a clearly marked work in progress.

## Checks

    node --test tests/events.test.mjs
    npm run build

Production uses the existing Vercel project and domain.
