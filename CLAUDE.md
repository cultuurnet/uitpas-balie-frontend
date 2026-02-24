# UiTPAS Balie Frontend

## Project overview

Next.js web application for managing UiTPAS cultural passes and activities. Serves both **web** and **mobile** interfaces from a single codebase. Device detection is viewport-based via `useDetectMobile` — no separate builds.

## Tech stack

- **Next.js 15.2.6** — app router, base path `/app`, strict mode
- **React 19**, **TypeScript 5.4.5** (strict mode)
- **Web UI:** shadcn/ui + Tailwind v4; **Mobile UI:** Material-UI (`@mui/material`) + Emotion
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

| Script              | Purpose                                 |
| ------------------- | --------------------------------------- |
| `yarn dev`          | Dev server (Turbopack)                  |
| `yarn build`        | Production build                        |
| `yarn lint`         | ESLint                                  |
| `yarn types:check`  | TypeScript check                        |
| `yarn prettify`     | Auto-format `src/`                      |
| `yarn format:check` | CI format validation                    |
| `yarn orval`        | Regenerate API hooks from OpenAPI specs |
| `yarn e2e`          | Playwright e2e tests                    |

## Architecture: as is

```
src/
├── app/                    # Next.js app router (pages, layouts, providers)
├── web/                    # Web app (shadcn + Tailwind)
│   ├── feature-*/          # Self-contained features
│   └── lib/ui/             # Web wrapper components built on top of shadcn
├── mobile/                 # Mobile app (Material-UI + Emotion)
│   ├── feature-*/
│   └── lib/ui/             # Mobile UI components and MUI theme
└── shared/                 # Business logic used by both apps
    ├── feature-*/
    └── lib/                #
        ├── auth/           # Auth context, hooks, interceptors
        ├── dataAccess/     # Orval-generated API hooks
        ├── i18n/           # Translations (nl/common.json)
        ├── user/           # User context and hooks
        └── utils/          # Shared hooks and utilities
```

## Architecture: to be: Unfinished

```
src/
├── api/                # Orval-generated API hooks
├── app/                # Next.js app router
│   ├── login/          # page.tsx + route-specific files
│   ├── counters/
│   └── ...
├── auth/               # Auth context, interceptors
├── hooks/              # All React hooks (use* functions)
├── i18n/               # Translations (nl/common.json)
├── layouts/            # Shares layout components
├── mobile/             # Mobile app (Material-UI + Emotion)
│   ├── feature-*/
│   └── lib/ui/         # Mobile UI components and MUI theme
├── tests/              # Playwright e2e tests.
├── ui/                 # Custom ui component files. Each with .stories file.
│   └── shadcn/         # The base components coming from shadcn
└── utils/              # Pure functions, constants, non-React helpers

```

**Feature structure pattern (legacy — dissolving into `hooks/` and `utils/`):**

Each feature currently follows this structure. New code should go directly
into `src/hooks/` (React hooks) or `src/utils/` (pure functions) instead.

```
feature-{name}/
├── components/    # UI components → src/ui/
├── hooks/         # Business logic hooks → src/hooks/
└── index.ts       # Public API
```

## Web app UI layer

The web app uses **shadcn/ui + Tailwind v4**. Mobile uses **Material-UI + Emotion** and is treated as a separate concern — do not apply web UI conventions there.

**Tailwind v4** is configured entirely in `src/app/globals.css` via `@theme` — there is no `tailwind.config.ts`. Brand colors, custom breakpoints (sm: 660px, md: 768px, lg: 1200px), and the Open Sans font are all defined there.

**Three-layer UI stack for web:**

| Layer              | Location             | Rule                                                     |
| ------------------ | -------------------- | -------------------------------------------------------- |
| shadcn primitives  | `src/ui/shadcn/`     | Never edit — regenerate via CLI                          |
| Web wrappers       | `src/web/lib/ui/`    | Project-specific components built on shadcn              |
| Feature components | `src/web/feature-*/` | Consume from `src/web/lib/ui/`, not directly from shadcn |

> **Legacy paths.** Web wrappers move to `src/ui/` and feature components
> to `src/app/[route]/`. The layering rule stays the same.

When writing web UI: use Tailwind classes for styling and `cn()` from `@/utils/shadcn` for conditional classes. Do not use Emotion or `sx` props in web components.

## Configuration

All env vars must be added to both `.env.example` **and** `src/shared/feature-config/getConfig.ts` + `types.ts` to be available client-side. Access via `useConfig()` hook — never read `process.env` directly in components.

Key env vars: `NEXT_PUBLIC_API_PATH`, `NEXT_PUBLIC_SEARCH_API_PATH`, `NEXT_PUBLIC_ENTRY_API_PATH`, `NEXT_PUBLIC_OAUTH_PATH`, `NEXT_PUBLIC_OAUTH_USERINFO_PATH`, `NEXT_PUBLIC_DEV_AUTH_TOKEN`, `NEXT_PUBLIC_GA_TAG`.

> **Legacy path.** `src/shared/feature-config/` will move to `src/utils/getConfig.ts`
> and `src/hooks/useConfig.ts` once `shared/` is dissolved.

## API integration (Orval)

Generated hooks live in `src/shared/lib/dataAccess/{service}/generated/`. Never edit these files — regenerate with `yarn orval` when OpenAPI specs change.

Wrap generated hooks in custom hooks (in feature `hooks/` folders) to add business logic. Axios base URLs are substituted at runtime via request interceptors using values from `useConfig()`.

> **Legacy path.** `src/shared/lib/dataAccess/` will move to `src/api/`.
> Custom hooks wrapping generated hooks will move to `src/hooks/` instead of feature `hooks/` folders.

## shadcn/ui components

Base components live in `src/ui/shadcn/` and are generated by the shadcn CLI. **Never edit these files directly** — they get overwritten when updated via `yarn dlx shadcn add <component> --overwrite`.

Extend them by wrapping in your feature or lib layer:

```tsx
// src/web/lib/ui/Button.tsx (legacy — will move to src/ui/Button.tsx)
import { Button as ShadcnButton } from '@/ui/shadcn/button';

export const Button = (props) => <ShadcnButton variant="default" {...props} />;
```

Use `cn()` from `@/utils/shadcn` to compose Tailwind classes when you need style overrides. To update a component, re-run `yarn dlx shadcn add <component> --overwrite`, then check the git diff to re-apply any intentional structural changes.

## Code Style

- No unnecessary comments (code should be self-explanatory)
- No emojis in user-facing text unless explicitly requested
- Remove unused code completely (no backwards-compatibility hacks)
- Avoid over-engineering: make only necessary changes
- Prefer simple solutions over abstractions
- Never create documentation that duplicates what code already expresses

## Visual testing (Storybook + Lost Pixel)

Every finished web component gets a Storybook story and a Lost Pixel visual baseline. Baselines are built incrementally alongside the migration.

**Workflow per component:**

1. Migrate component to shadcn + Tailwind
2. Write a co-located story (`ComponentName.stories.tsx`)
3. Run `npx lost-pixel docker update` to establish the baseline (Docker ensures consistent rendering across machines)
4. CI catches regressions on all baselined components automatically

Stories live next to the component they test. Only write stories for components in `src/web/lib/ui/` and `src/web/feature-*/` — not for shadcn primitives in `src/components/ui/`.

> **Legacy paths.** In the target architecture, stories live in `src/ui/` alongside
> their components. Shadcn primitives in `src/ui/shadcn/` are still excluded.

## Conventions

- Use `'use client'` only on interactive components; prefer server components where possible
- Put business logic in custom hooks, not components
- Web: style with Tailwind classes and `cn()`; Mobile: style with Emotion styled components and MUI theme tokens
- Import from feature `index.ts` only, never from internal paths of another feature
- Translations: all user-facing strings go in `src/shared/lib/i18n/locales/nl/common.json` (legacy — will move to `src/i18n/locales/nl/common.json`)

## Routes

| Path                  | Description                      |
| --------------------- | -------------------------------- |
| `/app/login`          | Login                            |
| `/app/counters`       | Counter (organisation) selection |
| `/app/activities`     | Activities list                  |
| `/app/expense-report` | Expense report download          |
| `/app/help`           | Help documentation               |
| `/app/mobile/*`       | Mobile equivalents               |
