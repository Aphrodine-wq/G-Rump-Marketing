# Security Audit – January 2026

This document records the verification of G-Rump security controls per [SECURITY_BASELINE.md](SECURITY_BASELINE.md) and [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md).

## Verified Controls

### Backend Security

| Control | Location | Status |
|---------|----------|--------|
| Helmet.js | `backend/src/index.ts` | ✅ Content-Security-Policy, HSTS, frameguard, referrer policy |
| CORS | `backend/src/index.ts` | ✅ Origin allowlist; no-origin rejected in production |
| Host allowlist | `backend/src/index.ts` | ✅ `ALLOWED_HOSTS` enforced when set |
| Rate limiting | `backend/src/middleware/rateLimiter.ts` | ✅ Per-IP limits applied |
| Request timeout | `backend/src/middleware/timeout.ts` | ✅ Chat/codegen/architecture timeouts |
| Input validation | `backend/src/middleware/validator.ts` | ✅ Length limits, prompt-injection patterns |
| API auth | `backend/src/middleware/authMiddleware.ts` | ✅ Optional/required auth; protected paths: `/api/chat`, `/api/ship`, `/api/codegen` |
| Agent governance | `backend/src/middleware/agentGovernance.ts` | ✅ Block/allowlist Moltbot, OpenClaw, etc. |
| Cookie security | `backend/src/middleware/cookieSecurity.ts` | ✅ Secure cookie options |

### Production Environment

| Variable | Purpose |
|----------|---------|
| `BLOCK_SUSPICIOUS_PROMPTS` | Reject prompt-injection patterns |
| `REQUIRE_AUTH_FOR_API` | Require JWT for high-cost endpoints |
| `SECURITY_STRICT_PROD` | Enforce production security gates |
| `CORS_ORIGINS` | Exact frontend origins (no wildcards) |
| `ALLOWED_HOSTS` | Production hostnames |
| `OUTPUT_FILTER_PII` | Redact PII in outputs |
| `OUTPUT_FILTER_HARMFUL` | Filter harmful content |
| `STRICT_COMMAND_ALLOWLIST` | Restrict tool execution |
| `SECURITY_SCAN_ROOT` | Limit security scan paths |
| `METRICS_AUTH` | Basic auth for `/metrics` |

### Electron-Specific

| Control | Status |
|---------|--------|
| `nodeIntegration: false` | ✅ Renderer has no Node access |
| `contextIsolation: true` | ✅ Preload bridge only |
| `webSecurity: true` (prod) | ✅ OAuth window |
| Auth tokens in localStorage | ✅ `mermaid-auth` key; consider `VITE_AUTH_STORAGE=session` for shared machines |

### CI Security

| Check | Workflow |
|-------|----------|
| npm audit | `.github/workflows/ci.yml` |
| Trivy | Container scanning |
| CodeQL | `.github/workflows/codeql.yml` |
| gitleaks | `.github/workflows/gitleaks.yml` |
| OSSF Scorecard | `.github/workflows/ossf-scorecard.yml` |

## Remaining Risks

1. **API key storage**: Dev uses `.env`; production should use a secret manager (Vercel env, Vault, etc.).
2. **Local development**: Defaults are permissive; never use dev config for public exposure.
3. **OAuth redirects**: `grump://auth/done` used in packaged Electron; ensure Supabase redirect URIs allow custom protocol if needed.

## Recommendations

1. Before any public deployment, run `node scripts/check-release-env.js` with `NODE_ENV=production`.
2. Use `VITE_AUTH_STORAGE=session` for web deployments to limit token persistence.
3. Rotate API keys and webhook secrets if exposure is suspected; see [SECURITY_BASELINE.md](SECURITY_BASELINE.md#incident-response).
