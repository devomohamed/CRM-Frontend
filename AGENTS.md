# AI Agent Guide (CRM-Frontend)

## Project overview
- Angular **standalone** app bootstrapped in `src/main.ts` via `bootstrapApplication(App, appConfig)`.
- Global app wiring lives in `src/app/app.config.ts` (providers) and routing in `src/app/app.routes.ts` (lazy `loadComponent` routes).
- High-level folder layout (start here): `src/app/{core,features,layout,shared,services,models,guards,interceptors}`.

## Runtime architecture / data flow
- **Routing:** `src/app/app.routes.ts`
  - Public pages: `/login`, `/register`, `/forgot-password`.
  - Authenticated shell: root path `''` loads `layout/app-layout/app-layout.component` and guards it with `canActivate: [authGuard]` from `src/app/guards/auth.guard`.
  - Feature pages are lazy-loaded standalone components (e.g. `features/customers/customers.component`, `features/dashboard/dashboard/dashboard`).
- **HTTP:** `provideHttpClient(withInterceptors([authInterceptor]))` in `src/app/app.config.ts`
  - Any API calls should go through Angular `HttpClient`; auth headers/token behavior is centralized in `src/app/interceptors/auth.interceptor`.
- **UI / styling:** PrimeNG is configured globally in `src/app/app.config.ts` using `providePrimeNG({ theme: { preset: Aura }})`.
- **i18n:** `@ngx-translate/core` is configured in `src/app/app.config.ts` with `defaultLanguage: 'en'` and `provideTranslateHttpLoader()`.
- **PWA:** Service worker enabled in non-dev mode via `provideServiceWorker('ngsw-worker.js', { enabled: !isDevMode() ... })` and configured by `ngsw-config.json`.

## Developer workflows (commands that matter)
From `package.json` / Angular CLI:
- Install: `npm ci` (or `npm install`)
- Dev server: `npm run start` (alias: `ng serve`) → `http://localhost:4200/`
- Build: `npm run build` (alias: `ng build`)
- Dev build watch: `npm run watch` (`ng build --watch --configuration development`)
- Unit tests: `npm test` (Karma/Jasmine)

## Project conventions to follow
- Prefer **standalone components** + route-level lazy loading (`loadComponent`) as shown in `src/app/app.routes.ts` (avoid adding NgModules unless the repo already uses them in specific places).
- Add cross-cutting concerns via **providers** in `src/app/app.config.ts` (router, Http interceptors, animations, PrimeNG theme, translate, service worker).
- Keep “page” UI in `src/app/features/**` and shared/reusable UI or utilities in `src/app/shared/**`.
- Authentication gating is route-based (`authGuard`) and request-based (`authInterceptor`); changes to auth behavior usually involve both.

## Key files to read first when modifying behavior
- App bootstrap: `src/main.ts`
- App-wide providers: `src/app/app.config.ts`
- Routing + feature entry points: `src/app/app.routes.ts`
- Auth boundaries: `src/app/guards/auth.guard`, `src/app/interceptors/auth.interceptor`
- Styling entrypoint: `src/styles.css`

## Existing agent/AI conventions found
- No repo-specific agent instruction files were discovered besides `README.md` (which contains standard Angular CLI commands).