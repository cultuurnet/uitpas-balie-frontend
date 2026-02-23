# UiTPAS Balie Frontend

## Project overview

Next.js web application for managing UiTPAS cultural passes and activities. Serves both **web** (Joy UI) and **mobile** (Material-UI) interfaces from a single codebase. Device detection is viewport-based via `useDetectMobile` — no separate builds.

## Tech stack

- **Next.js 15.2.6** — app router, base path `/app`, strict mode
- **React 19**, **TypeScript 5.4.5** (strict mode)
- **Joy UI** (`@mui/joy`) for web, **Material-UI** (`@mui/material`) for mobile
- **React Query** (`@tanstack/react-query`) — server state, 5 min stale time, no refetch on focus/reconnect
- **Orval** — auto-generates React Query + Axios hooks from OpenAPI specs
- **Axios** — HTTP client with request/response interceptors
- **next-i18next** — Dutch only (`nl`); restart server after editing translations
- **Playwright** — e2e tests

## Local development

```bash
nvm use 18.16.1        # Required Node version
cp .env.example .env.local
yarn install
yarn dev               # Turbopack enabled by default
# App runs at http://localhost:3000/app
```

After login: manually set the `PHPSESSID` cookie to `Secure` + `SameSite=None` in DevTools (cross-host cookie limitation in local dev).

**Mobile device testing:**
```bash
yarn expose            # Creates a public tunnel URL (LocalXpose)
# Set NEXT_PUBLIC_DEV_AUTH_TOKEN to a bearer token copied from DevTools
```

## Key scripts

| Script | Purpose |
|---|---|
| `yarn dev` | Dev server (Turbopack) |
| `yarn build` | Production build |
| `yarn lint` | ESLint |
| `yarn types:check` | TypeScript check |
| `yarn prettify` | Auto-format `src/` |
| `yarn format:check` | CI format validation |
| `yarn orval` | Regenerate API hooks from OpenAPI specs |
| `yarn e2e` | Playwright e2e tests |

## Architecture

```
src/
├── app/              # Next.js app router (pages, layouts, providers)
├── web/              # Web-specific features (Joy UI)
│   ├── feature-*/   # Self-contained features
│   └── lib/ui/      # Web UI components and theme
├── mobile/           # Mobile-specific features (Material-UI)
│   ├── feature-*/
│   └── lib/ui/
└── shared/           # Cross-platform business logic
    ├── feature-*/
    └── lib/
        ├── auth/         # Auth context, hooks, interceptors
        ├── dataAccess/   # Orval-generated API hooks
        ├── i18n/         # Translations (nl/common.json)
        ├── user/         # User context and hooks
        └── utils/        # Shared hooks and utilities
```

**Feature structure pattern:**
```
feature-{name}/
├── components/    # UI components
├── hooks/         # Business logic hooks
└── index.ts       # Public API (only import from index)
```

## Configuration

All env vars must be added to both `.env.example` **and** `src/shared/feature-config/getConfig.ts` + `types.ts` to be available client-side. Access via `useConfig()` hook — never read `process.env` directly in components.

Key env vars: `NEXT_PUBLIC_API_PATH`, `NEXT_PUBLIC_SEARCH_API_PATH`, `NEXT_PUBLIC_ENTRY_API_PATH`, `NEXT_PUBLIC_OAUTH_PATH`, `NEXT_PUBLIC_OAUTH_USERINFO_PATH`, `NEXT_PUBLIC_DEV_AUTH_TOKEN`, `NEXT_PUBLIC_GA_TAG`.

## API integration (Orval)

Generated hooks live in `src/shared/lib/dataAccess/{service}/generated/`. Never edit these files — regenerate with `yarn orval` when OpenAPI specs change.

Wrap generated hooks in custom hooks (in feature `hooks/` folders) to add business logic. Axios base URLs are substituted at runtime via request interceptors using values from `useConfig()`.

## Code Style

- No unnecessary comments (code should be self-explanatory)
- No emojis in user-facing text unless explicitly requested
- Remove unused code completely (no backwards-compatibility hacks)
- Avoid over-engineering: make only necessary changes
- Prefer simple solutions over abstractions
- Never create documentation that duplicates what code already expresses

## Conventions

- Use `'use client'` only on interactive components; prefer server components where possible
- Put business logic in custom hooks, not components
- Style with Emotion styled components; use theme tokens, not hardcoded values
- Import from feature `index.ts` only, never from internal paths of another feature
- Translations: all user-facing strings go in `src/shared/lib/i18n/locales/nl/common.json`
- No test files exist yet — Playwright is configured for e2e when needed

## Routes

| Path | Description |
|---|---|
| `/app/login` | Login |
| `/app/counters` | Counter (organisation) selection |
| `/app/activities` | Activities list |
| `/app/expense-report` | Expense report download |
| `/app/help` | Help documentation |
| `/app/mobile/*` | Mobile equivalents |
