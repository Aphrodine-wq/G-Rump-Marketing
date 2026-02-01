# Production Deployment Checklist

Use this checklist to get G-Rump up and running and ready for production.

## v1.0 release (quick pass)

Before cutting a release, run through this once:

- [ ] **Automated checks:** `node scripts/ship-ready-check.js` (runs check-all + tests). Use `--env` to also run check-release-env when NODE_ENV=production; use `--full` to include electron build.
- [ ] From repo root: `npm run check-all` (backend + frontend type-check and lint).
- [ ] From repo root: `npm test` (frontend unit + backend unit tests). See [TESTING.md](TESTING.md).
- [ ] Set `NODE_ENV=production`, `CORS_ORIGINS` (no wildcards), and `BLOCK_SUSPICIOUS_PROMPTS=true` for production.
- [ ] Optionally: `REQUIRE_AUTH_FOR_API=true` if the backend is public.
- [ ] Confirm legal links work: Settings → Legal (Terms, Privacy, Acceptable Use open in browser). Optional: run `node scripts/check-release-env.js` if you use it.

### Extended release checklist (optional)

For full website, desktop, CLI, and docs verification:

- **Website (self-hosted):** Backend and frontend deployed; `CORS_ORIGINS`, `REQUIRE_AUTH_FOR_API`, `BLOCK_SUSPICIOUS_PROMPTS`, `SECURITY_STRICT_PROD`, output filters, `ALLOWED_HOSTS` set; `/health` and `/metrics` OK.
- **Windows desktop:** `npm run electron:build` succeeds; installer at `frontend/electron-dist/G-Rump.exe`; backend `.env` path documented; smoke test.
- **CLI:** `npm i -g grump-cli`, `grump auth login`, `grump ship "hello"` work.
- **Docs & OSS:** README points to quick setup; `docs/GETTING_STARTED.md` checked; SECURITY.md and SECURITY_BASELINE.md set; LICENSE verified.

See [archive/RELEASE_CHECKLIST.md](archive/RELEASE_CHECKLIST.md) for the original checklist.

## Security (required when API is reachable by untrusted users)

See also [SECURITY_BASELINE.md](SECURITY_BASELINE.md) for required production security posture.

When the backend is publicly reachable (e.g. web app, public API), you **must**:

- [ ] Set `BLOCK_SUSPICIOUS_PROMPTS=true` so prompt-injection–style patterns in user input are rejected (see [validator](../backend/src/middleware/validator.ts)). Diagram, ship, PRD, architecture, and codegen routes use the validator.
- [ ] Set `REQUIRE_AUTH_FOR_API=true` so `/api/chat`, `/api/ship`, and `/api/codegen` require authentication. Unauthenticated requests to those paths will receive 401.
- [ ] Set `SECURITY_STRICT_PROD=true` to enforce production security gates (see Security Baseline below).
- [ ] **Secrets (production-only):** Set webhook and service secrets for any feature you enable:
  - `GRUMP_WEBHOOK_SECRET` – required in production if you use inbound/outbound webhooks; when unset, webhook routes return 503.
  - `TWILIO_WEBHOOK_SECRET` – required in production when `MESSAGING_PROVIDER=twilio`; when unset, the messaging inbound route returns 503.
  - `STRIPE_WEBHOOK_SECRET` (and `STRIPE_SECRET_KEY`) – required if you use Stripe billing; `POST /api/billing/webhook` uses raw body for signature verification.
- [ ] For security scan endpoints (`/api/security/*`), set `SECURITY_SCAN_ROOT` to restrict scan paths; otherwise the current working directory is used as the allowed root. See [security-compliance](../backend/src/features/security-compliance/service.ts).
- [ ] Restrict **metrics** (`/metrics`) with `METRICS_AUTH` (Basic auth) and firewall so only your monitoring can reach it.

## Environment and Secrets

- [ ] Set `NODE_ENV=production`.
- [ ] Set `CORS_ORIGINS` to the exact origins of your web/desktop clients (no wildcards in prod).
- [ ] Configure **Anthropic** API key and any other LLM/usage keys.
- [ ] Set `VITE_AUTH_STORAGE=session` (or another safe storage) to avoid persisting access tokens across browser sessions unless you explicitly want that; fallback storage is in-memory if the configured storage is unavailable.
- **Backend (single service):**
  - [ ] Set `GRUMP_WEBHOOK_SECRET` if you use webhooks. When unset in production, webhook routes return 503.
  - [ ] Set `TWILIO_WEBHOOK_SECRET` when using Twilio inbound messaging (`MESSAGING_PROVIDER=twilio`). When unset in production, the messaging inbound route returns 503.
  - [ ] Configure Supabase URL and anon key (and service role only where needed) for auth.
  - [ ] Set `STRIPE_WEBHOOK_SECRET` (and `STRIPE_SECRET_KEY`) if you use Stripe billing. `POST /api/billing/webhook` uses raw body for signature verification.
  - [ ] Ensure auth redirect URLs and cookie settings match your production domain.

## Web app: Supabase and Stripe (mock vs real)

- **Mock behavior:** When Supabase URL/anon key are not set, the backend uses mock auth (e.g. no real sign-in; tier from `getTierForUser`/`TIER_DEFAULT`). When Stripe keys are not set, billing endpoints return placeholder or 503. The web app can still run; login/register and billing will be mock or disabled.
- **Real auth (Supabase):** Set `SUPABASE_URL` and `SUPABASE_ANON_KEY` (and optionally `SUPABASE_SERVICE_ROLE_KEY` where admin access is needed). Configure redirect URLs in the Supabase dashboard to match your web app origin (e.g. `https://app.g-rump.com/auth/callback`). The web app login/register and JWT validation then use real Supabase.
- **Real billing (Stripe):** Set `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`; configure the webhook URL in the Stripe dashboard (e.g. `https://api.g-rump.com/api/billing/webhook`). Set the Stripe publishable key in the frontend (e.g. `VITE_STRIPE_PUBLISHABLE_KEY`) if the web app uses Stripe Checkout or Customer Portal. `GET /api/billing/me` and checkout/webhook flows then use real Stripe.
- **Summary:** To ship the web app as a product surface, configure Supabase and Stripe env vars above and verify login, dashboard, and billing flows. See [SETUP.md](SETUP.md) for per-platform env details.

## Rate Limiting and Redis

- [ ] Set `REDIS_HOST` (and `REDIS_PORT` if not 6379) so rate limiting is shared across restarts and replicas (see [CAPABILITIES.md](CAPABILITIES.md)).
- [ ] Configure Upstash QStash for asynchronous tasks (see `backend/DEPLOY_VERCEL.md`).
- **Redis unavailable:** If Redis is down, the app runs with in-memory rate limiting (not shared) and no L2 cache. See [RUNBOOK_REDIS](RUNBOOK_REDIS.md) for behavior and recovery.

## Abuse Prevention

- [ ] Set `BLOCK_SUSPICIOUS_PROMPTS=true` in production (see **Security** section above).
- [ ] Use Redis for rate limiting (see above). Set `REQUIRE_AUTH_FOR_API=true` when the backend is public (see **Security** section above).

## Security Baseline (required in production when `SECURITY_STRICT_PROD=true`)

These are enforced by config validation when `NODE_ENV=production`:

- [ ] `CORS_ORIGINS` set (no wildcards).
- [ ] `ALLOWED_HOSTS` set to your production hostnames (comma-separated).
- [ ] `BLOCK_SUSPICIOUS_PROMPTS=true`
- [ ] `REQUIRE_AUTH_FOR_API=true`
- [ ] `OUTPUT_FILTER_PII=true` and `OUTPUT_FILTER_HARMFUL=true`
- [ ] `STRICT_COMMAND_ALLOWLIST=true`
- [ ] `SECURITY_SCAN_ROOT` set to a safe base directory
- [ ] `METRICS_AUTH` set (Basic auth) to lock `/metrics`

## CI/CD and deployment

- **CI pipeline** ([.github/workflows/ci.yml](../.github/workflows/ci.yml)): On push/PR to `main`, runs lint, type-check, backend and frontend tests, backend coverage (with thresholds), E2E (Playwright), security audit (npm audit, Trivy), and on push to `main` builds Docker images. Coverage is uploaded to Codecov.
- **Deployment:**
  - **Vercel** ([.github/workflows/vercel-deploy.yml](../.github/workflows/vercel-deploy.yml)): Preview deploys on PRs; production deploys on push to `main`/`develop` when `VERCEL_TOKEN` and project IDs are configured.
  - **Marketing site (g-rump.com):** Served from [marketing-site/](../marketing-site/). Use a separate Vercel project with Root Directory `marketing-site` and domain g-rump.com; optional GitHub Action [vercel-deploy-marketing.yml](../.github/workflows/vercel-deploy-marketing.yml) (secrets: `VERCEL_PROJECT_ID_MARKETING`, `VERCEL_ORG_ID`, `VERCEL_TOKEN`). See [marketing-site/README.md](../marketing-site/README.md#deploying-g-rumpcom-marketing-site). Verify: https://g-rump.com shows the marketing landing (title "G-Rump | AI Development Platform - Ship 10x Faster with Zero Friction"), not the app.
  - **Staging/production** ([.github/workflows/deploy.yml](../.github/workflows/deploy.yml)): Deploy to staging on push to `develop` (e.g. Railway, GHCR images); deploy to production on release (published from `main`). Configure `RAILWAY_TOKEN` and `RAILWAY_SERVICE_ID` (or equivalent) for backend.
- **Infrastructure as code:** Use [deploy/docker-compose.yml](../deploy/docker-compose.yml) (and optional GPU override) for a production-like stack. For multi-instance and Redis, see [SCALING.md](SCALING.md).

## Database

- [ ] Migrations run automatically on backend startup when using the default SQLite DB (see [database.ts](../backend/src/db/database.ts)). The build copies `src/db/migrations` into `dist/db/migrations`; no separate migration step is required.
- [ ] Use a dedicated DB (e.g. PostgreSQL if you switch from SQLite) for production and ensure backups and access control.

## Auth and Legal

- [ ] Ensure production signup/register flows require acceptance of ToS and Privacy (and optionally AUP). The web app Register flow includes required checkboxes when implemented as in [docs-site/legal](../docs-site/legal/).
- [ ] Host and link Terms, Privacy, and Acceptable Use from the web app (`/terms`, `/privacy`, `/acceptable-use`) and from any desktop in-app links. Legal text lives in [docs-site/legal](../docs-site/legal/) (published at https://docs.g-rump.com/legal/…). Desktop app: Settings → Legal opens these in the browser.

## Observability and Hardening

- [ ] Ensure **log levels** and log sinks do not expose secrets or PII in production.
- [ ] Rely on centralized error sanitization: 500 and error SSE responses do not expose `err.message` in production (see [backend/src/utils/errorResponse.ts](../backend/src/utils/errorResponse.ts)).
- [ ] Optionally restrict **metrics** (`/metrics`) with `METRICS_AUTH` and firewall so only your monitoring can reach it.

## Optional: API Auth and Network Exposure

- **If the backend is public:** Set `REQUIRE_AUTH_FOR_API=true` to require auth for `/api/chat`, `/api/ship`, and `/api/codegen`. Unauthenticated requests to those paths will receive 401.
- **If the backend is only used by a desktop app or internal services:** Keep it off the public internet or behind a VPN/private network and document that as the production posture.

## Verification (ensure software works as intended)

Use these steps to confirm the app and marketing site work before and after release:

1. **CI (automated):** On every push/PR, [ci.yml](../.github/workflows/ci.yml) runs lint, type-check, backend and frontend tests, coverage, and E2E. Require CI green before merge.
2. **Local:** From repo root run `npm run check-all` then `npm test`. Start backend and frontend (`npm run dev`). Smoke test: open app, send a message; optionally `cd frontend && npm run test:e2e`. Health: `curl http://localhost:3000/health/quick` (and optionally `/health/ready`).
3. **Production / staging:** After deploy: `curl https://app.g-rump.com/health/quick` (and `/health/ready` if API is on same origin). Manually: load app.g-rump.com, sign-in, one full chat/ship flow. Legal: Settings → Legal opens docs.g-rump.com/legal/… (see [Auth and Legal](#auth-and-legal)).
4. **Optional smoke:** [verify-marketing-site.yml](../.github/workflows/verify-marketing-site.yml) runs on schedule and `workflow_dispatch` to confirm g-rump.com serves the marketing landing. [verify-production-health.yml](../.github/workflows/verify-production-health.yml) runs on schedule and `workflow_dispatch` to curl production `/health/quick` and fail if down (set `PRODUCTION_APP_URL` in repo variables to override default https://app.g-rump.com).

See also [RUNBOOK](RUNBOOK.md) (startup, health checks, logs) and [TESTING.md](../TESTING.md) (backend/frontend/E2E commands).

## Launch checklist (go-live)

Use this short list when cutting over to production or a new environment:

- [ ] **Env:** `NODE_ENV=production`, `CORS_ORIGINS`, `BLOCK_SUSPICIOUS_PROMPTS`, `REQUIRE_AUTH_FOR_API`, `REDIS_HOST`, and all required secrets set (see [Environment and Secrets](#environment-and-secrets)).
- [ ] **DNS:** App and API hostnames resolve; SSL/TLS in place (e.g. Vercel or your edge).
- [ ] **Legal:** Terms, Privacy, AUP linked and accessible; signup/register flows require acceptance where applicable.
- [ ] **Monitoring:** `/health/quick` and `/health/ready` monitored; optional: [observability stack](RUNBOOK.md#metrics-and-observability) (Prometheus, Grafana, alerts); log aggregation and error tracking.
- [ ] **Rollback:** Document rollback steps (e.g. revert deploy, restore DB backup) and who can execute; test rollback once in staging.

## Runbooks

- **Redis unavailable:** [RUNBOOK_REDIS](RUNBOOK_REDIS.md)
- **NIM down, high error rate, cost spike:** [RUNBOOK](RUNBOOK.md)

## Quick Reference

| Item | Env / Config |
|------|----------------|
| Webhook secret required in prod | `GRUMP_WEBHOOK_SECRET`; if unset, webhooks return 503 |
| Twilio webhook secret in prod | `TWILIO_WEBHOOK_SECRET` when `MESSAGING_PROVIDER=twilio` |
| Require auth for chat/ship/codegen | `REQUIRE_AUTH_FOR_API=true` |
| Shared rate limiting | `REDIS_HOST`, `REDIS_PORT` |
| Block suspicious prompts (prod) | `BLOCK_SUSPICIOUS_PROMPTS=true` |
| Metrics auth | `METRICS_AUTH` (Basic auth for `/metrics`) |
| Marketing site (g-rump.com) | Separate Vercel project, root `marketing-site`; optional [vercel-deploy-marketing.yml](../.github/workflows/vercel-deploy-marketing.yml) |