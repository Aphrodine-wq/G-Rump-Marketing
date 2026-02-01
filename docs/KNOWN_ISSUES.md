# Known Issues and Suppressions

This doc lists intentional suppressions and remaining work. Many lint/type items have been addressed (Phase 1.1).

## Backend

### TypeScript
- **logger.ts**: `@ts-expect-error` for pino-http callback types (documented; runtime behavior is correct). See line 37.
- **httpClient.ts**: `@ts-expect-error` for Node.js fetch `agent` option; standard RequestInit does not include it but Node fetch supports it for connection pooling.
- **tsconfig**: `strict: true`, `noEmitOnError: true` (backend).

### ESLint
- **validator.ts**: `eslint-disable-next-line no-control-regex` — intentional: strip control chars for security.
- **correlationMiddleware.ts**, **kimiMiddleware.ts**: `eslint-disable-next-line @typescript-eslint/no-namespace` — intentional: Express namespace augmentation.
- Backend lint passes with no errors; remaining optional improvements can be done incrementally.

## Frontend
- **main.ts**, **specStore.ts**: `eslint-disable @typescript-eslint/no-non-null-assertion` — root mount target and derived store (Phase 1.1).
- **errorHandler.ts**: No longer uses file-level any; API error shape typed as `ApiError`.
- **mermaid.ts**: `eslint-disable @typescript-eslint/no-explicit-any` — Mermaid theme type not in @types (Phase 1.1).
- **touchGestures.test.ts**, **mermaid.test.ts**: `@ts-expect-error` for test-only mocks (vibrate, internal state).
- Some non-null assertions remain in stores; type-check and lint pass. Optional: replace with proper types.

## How to run checks
- **Backend**: `cd backend && npm run type-check && npm run lint && npm run build`
- **Frontend**: `cd frontend && npm run type-check && npm run lint && npm run build`
- **All**: From repo root: `npm run check-all` (runs backend + frontend type-check and lint).

## Timeouts
- Request timeout middleware ([backend/src/middleware/timeout.ts](backend/src/middleware/timeout.ts)): chat/stream 10 min, codegen 5 min, architecture 3 min (generate-stream 5 min). Streaming responses (Accept: text/event-stream) skip the middleware so long sessions are not cut off.

## Architecture and Codegen (manual verification)
- **Architecture mode**: If "describe → Mermaid → PRD" fails, check: (1) `NVIDIA_NIM_API_KEY` or `OPENROUTER_API_KEY` in backend/.env, (2) network/CORS, (3) backend logs for 4xx/5xx or timeout. Endpoints: `POST /api/architecture/generate`, `POST /api/prd/generate`.
- **Codegen / tool calls**: If timeouts or silent failures occur, verify: (1) timeout values in timeout middleware and toolExecutionService (bash default 30s), (2) chat stream timeout is skipped for SSE; (3) backend logs for tool execution errors.

## Agent Governance (Moltbot/OpenClaw)
- Requests from Moltbot, OpenClaw, Clawdbot, and similar AI agents are **blocked by default** on `/api/chat`, `/api/ship`, `/api/codegen`.
- Configure via `AGENT_ACCESS_POLICY` (block | allowlist | audit_only), `AGENT_ALLOWLIST`, `AGENT_RATE_LIMIT_PER_HOUR` in backend/.env.
- Allowlisted agents hitting ship/codegen require human approval via `POST /api/approvals/:id/approve` before retrying with `X-Approval-Id` header.
- See [backend/src/middleware/agentGovernance.ts](../backend/src/middleware/agentGovernance.ts) for detection logic and policy enforcement.

## Redis
- When `REDIS_HOST` is set but Redis is unreachable, the app runs with in-memory rate limiting (not shared) and no L2 cache. `/health/detailed` reports `redis: degraded`. See [RUNBOOK_REDIS](RUNBOOK_REDIS.md).

## Verification (automated)
- **Backend unit tests**: `cd backend && npm test` — all pass.
- **Frontend unit tests**: `cd frontend && npm run test:run` — all pass.
- **CLI**: `cd packages/cli && npm run build` — builds successfully.
- **Web app**: `cd app-dashboard && npm run build` — builds successfully (fixed missing `Dashboard` import in [app-dashboard/src/App.svelte](app-dashboard/src/App.svelte)).
- **CI**: [.github/workflows/ci.yml](.github/workflows/ci.yml) — E2E job now builds backend before starting server (`npm run build` then `npm run start:prod`).

## Screens
- **SetupScreen**: Wired into [frontend/src/App.svelte](frontend/src/App.svelte). Shown when `!$setupComplete`; completing or skipping calls `preferencesStore.completeSetup()` so the main chat is shown.

## Changelog
- Agent governance: Block Moltbot/OpenClaw by default; allowlist + approval gate for ship/codegen. Env: AGENT_ACCESS_POLICY, AGENT_ALLOWLIST.
- Phase 1.1: Cleared backend lint/type suppressions (any → unknown, non-null fixes, empty object types, validator/logger documented). Backend strict, lint clean.
- E2E: global-setup waits for backend health in CI; Playwright config and waits hardened.
- Evals: parseEvalsSummary.mjs path fixed; CI publishes score summary when API keys are set.
- UI: Keyboard shortcuts (Ctrl+B sidebar, Ctrl+Shift+L or / focus chat); demo note on SetupScreen; Export for plan/architecture/PRD.
- Deploy: README documents VITE_API_URL for production and Windows installer path.
- Removed unused `@ts-expect-error` in backend `rateLimiter.ts`. Added root `npm run check-all`. SQLite WAL in .gitignore. Timeouts tuned. CI E2E uses `start:prod`. SetupScreen on first load. Web app Dashboard import fixed.
