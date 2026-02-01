# Release Notes

## v2.0.0 (V2.0 Full Roadmap)

**Release date:** 2026-01-31

### V2.0 Highlights

- **Intent Compiler modes**: Hybrid, rust-first, and llm-first modes. Env `INTENT_COMPILER_MODE` and `mode` in `POST /api/intent/parse`. Hybrid mode resolves ambiguity via LLM when score exceeds threshold.
- **One-click Full Demo**: `runFullDemoMode()` – Architecture → PRD → Code generation. "Full Demo" button in ChatInterface.
- **Shareable bundles**: `POST /api/share` with `type: 'bundle'` and `items` array for diagram + PRD + plan.
- **Vercel deploy preset**: `POST /api/cloud/vercel-preset` returns opinionated config for React, Vue, Svelte, Next.js, Vite, Express.
- **Agent evals expansion**: Safety tasks (jailbreak, harmful code), scheduled-agent scenarios, swarm (full-stack, microservices, CI/CD).
- **E2E specs**: full-demo, intent-optimizer, share-flow. [DEMO_E2E_SCRIPT.md](DEMO_E2E_SCRIPT.md).
- **AgentSwarmVisualizer**: Run again button, error recovery hint.
- **Reduced-motion**: CostDashboard and CloudDashboard respect `prefers-reduced-motion`.

### Testing

- Backend: intentCompilerService tests, share bundle tests, expanded evals.
- Frontend: retryHandler coverage, coverage exclusions for optional UI modules.
- E2E: full-demo, intent-optimizer, share-flow specs.

---

## v1.0.0 (post tech-debt pass)

**Release date:** 2025-01-30

### Tech debt and system finish (this pass)

- **Deprecated API:** `planMode` in POST `/api/chat/stream` documented as deprecated in [API_VERSIONING.md](API_VERSIONING.md); backend logs a deprecation warning when `planMode` is sent. Use `mode: 'plan'` instead; support removed in v2.0.
- **Stubs documented:** Webhook chat trigger and PostgreSQL stub documented as out of scope / planned in [SYSTEM_EVALUATION.md](SYSTEM_EVALUATION.md), [CAPABILITIES.md](CAPABILITIES.md), [SCALING.md](SCALING.md). zipService comment shortened.
- **Lint/type:** [KNOWN_ISSUES.md](KNOWN_ISSUES.md) updated with full suppression inventory; errorHandler typed with `ApiError` (no file-level any); intentional comments added for remaining suppressions.
- **Dependency audit:** [TESTING.md](TESTING.md) documents `npm audit` and `npm outdated` for backend/frontend/marketing-site and intentional pins.
- **Docs sync:** [SYSTEM_EVALUATION.md](SYSTEM_EVALUATION.md) aligned with [SYSTEM_RATING.md](SYSTEM_RATING.md); docs vs docs-site map in [docs/README.md](docs/README.md).
- **Production:** [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md) and [SECURITY_BASELINE.md](SECURITY_BASELINE.md) cross-linked; [RUNBOOK.md](RUNBOOK.md) deploy/observability steps and last-verified note; [Launch checklist](PRODUCTION_CHECKLIST.md#launch-checklist-go-live) added for go-live.
- **Web surface:** Supabase/Stripe mock vs real and required env documented in [PRODUCTION_CHECKLIST](PRODUCTION_CHECKLIST.md#web-app-supabase-and-stripe-mock-vs-real) and [SETUP.md](SETUP.md).
- **Rating:** [SYSTEM_RATING.md](SYSTEM_RATING.md) path to 1000 and status table updated; backend licenseService and chatCache unit tests added; path to 80% backend coverage in [TESTING.md](TESTING.md).
- **GTM:** Launch checklist in PRODUCTION_CHECKLIST; marketing site Case studies placeholder and README updated.

### Highlights (v1.0.0)

- **G-Rump 900+ finish**: Coverage and docs milestones for production readiness.
- **Backend**: Unit tests for plan, spec, license, chatCache services; core coverage 50% (threshold enforced in CI); optional modules excluded. Path to 80%: see [TESTING.md](TESTING.md).
- **Frontend**: Core coverage 80%+ (stores, lib, utils); thresholds 80% statements/lines/functions, 75% branches; CI runs `npm run test:coverage`. Components/UI excluded from coverage.
- **CI**: Backend and frontend both run tests with coverage; E2E (Playwright), security audit, Docker build on main.
- **Docs**: [SYSTEM_RATING.md](SYSTEM_RATING.md) and [AGENT_TODOS.json](../AGENT_TODOS.json) reconciled; [TESTING.md](TESTING.md) updated with coverage and dependency audit.

### Testing

- Backend: 61 test files (including licenseService, chatCache); coverage 50% statements/lines on core (optional modules excluded).
- Frontend: 35 test files, 672+ tests; coverage 83% statements on core (components, design-system, electron, analytics excluded).
- E2E: Critical journeys (auth/setup, ship/codegen, critical-journeys) covered.

### Security and observability

- Input validation on plan, spec, voice routes; [SECURITY_BASELINE.md](SECURITY_BASELINE.md) documents API key handling and CI security scanning.
- Observability: correlation IDs, structured logging, metrics at `/metrics`; optional Grafana/Prometheus in `observability/`; [OBSERVABILITY.md](OBSERVABILITY.md).

### Upgrade and deploy

- See [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md) for v1.0 quick pass: `npm run check-all`, `npm test`, env (`NODE_ENV=production`, `CORS_ORIGINS`, `BLOCK_SUSPICIOUS_PROMPTS`), Legal links.
- Optional: `node scripts/check-release-env.js` for release env checks.
- Tag: `git tag v1.0.0` (or v1.1.0) and push tags if desired.
- Deploy per existing workflows: [.github/workflows/deploy.yml](../.github/workflows/deploy.yml), Vercel, etc.
- Post-deploy: verify `/health/quick`, `/health/ready`; smoke test (sign-in, one chat/ship flow); Settings → Legal.
