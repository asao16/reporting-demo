# Reporting Demo

Angular public demo inspired by a private reporting frontend. It preserves the product style, layout patterns, Angular standalone structure, Less theme and ng-zorro component usage while replacing all backend behavior with fictitious local data.

## What is included

- Angular 21 standalone application.
- ng-zorro layout primitives, tables, buttons, tabs, drawers, badges, selects, cards and icons.
- Main layout with responsive sidebar, header and export jobs drawer.
- Dashboard, report browser, report viewer with sections, AI-style assistant panel, companies and users.
- Modular report renderer composed from dedicated blocks for filters, KPI cards, progress summaries, series charts, tables, timelines and supplier cards.
- Typed mock data under `src/app/demo-data`.
- Less theme and variables aligned to the original visual system.

## Run locally

```bash
npm install
npm run start
```

The app runs at `http://localhost:4200` when started by Angular CLI.

## IDE

WebStorm is configured in `.idea/workspace.xml` with the same shape used by Angular projects:

- `Angular CLI Server`: runs `npm run start`
- `Angular Application`: opens/debugs `http://localhost:4200`

## Build

```bash
npm run build
```

## Test

```bash
npm test
```

The test script runs the Playwright visual and interaction audit across desktop and mobile viewports.

## Safety

All companies, users, emails, report names and operational records are fictional demo data. The demo does not include private services, credentials, production URLs, screenshots, auth configuration or proprietary backend integrations.
