# Security Baseline (G-Rump)

This document defines the minimum security posture for production deployments of G-Rump.
It is enforced when `NODE_ENV=production` and `SECURITY_STRICT_PROD=true`. See [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md) for the full pre-production checklist and [RUNBOOK.md](RUNBOOK.md) for incident response.

## Core Principles

- **Zero trust by default**: Require auth for all high-cost endpoints.
- **Least privilege**: Restrict hosts, CORS, and file scan roots.
- **Data minimization**: Redact secrets and PII in outputs.
- **Defense in depth**: Rate limiting, validation, and allowlists.

## Required Production Controls

Set these in production before exposing the API to untrusted users:

- `SECURITY_STRICT_PROD=true`
- `CORS_ORIGINS` set to exact frontend origins (no wildcards)
- `ALLOWED_HOSTS` set to your production hostnames (comma-separated)
- `BLOCK_SUSPICIOUS_PROMPTS=true`
- `REQUIRE_AUTH_FOR_API=true`
- `OUTPUT_FILTER_PII=true`
- `OUTPUT_FILTER_HARMFUL=true`
- `STRICT_COMMAND_ALLOWLIST=true`
- `SECURITY_SCAN_ROOT=/absolute/path/to/allowed/root`
- `METRICS_AUTH=user:password` (Basic auth for `/metrics`)

## Recommended Controls

- Use Redis for shared rate limiting in production.
- Store secrets in your host's secret manager (never in `.env` committed to git).
- Use HTTPS-only in production (terminate TLS at your edge or platform).
- Restrict `/metrics` via firewall or VPC in addition to Basic auth.
- Configure frontend auth storage via `VITE_AUTH_STORAGE` (e.g., `session`) so access tokens are scoped to a browser session instead of living in long-running local storage.

## High-Risk Features

The following features should be enabled only if you have the appropriate secrets
and access controls in place:

- Webhooks (`/api/webhooks/*`)
- Messaging (Twilio inbound)
- Billing (Stripe)
- Security scans (filesystem access)

## Incident Response

If you suspect a security incident:

1. Rotate API keys and webhook secrets.
2. Disable external integrations.
3. Review logs and access patterns.
4. Notify users if their data may be impacted.

For disclosure details, see `SECURITY.md`.

## Security scanning in CI

The repository uses automated security checks in [.github/workflows/ci.yml](../.github/workflows/ci.yml) and related workflows:

- **Dependencies:** `npm audit --audit-level=high` for backend and frontend; failures block the pipeline.
- **Containers:** [Trivy](https://github.com/aquasecurity/trivy) scans the filesystem for vulnerabilities; results are uploaded as SARIF (Security tab).
- **Code:** [CodeQL](https://codeql.github.com/) analysis runs via [.github/workflows/codeql.yml](../.github/workflows/codeql.yml) when configured.
- **Secrets:** [gitleaks](https://github.com/gitleaks/gitleaks) and [OSSF Scorecard](https://security.openssf.org/scorecard) run via their workflows when enabled.

Ensure API keys and secrets are never committed; use environment variables and secret managers (e.g. GitHub Secrets, Vercel env, or a vault) for production.

## API Key Secure Storage

Production deployments should use a secret manager instead of plain `.env` files:

| Platform | Integration | Notes |
|----------|-------------|-------|
| **Vercel** | Project Settings → Environment Variables | Encrypted at rest; inject at build/runtime |
| **GitHub Actions** | Repository Secrets | Use for CI; never log or echo |
| **HashiCorp Vault** | `SECRET_MANAGER_URL` + KV engine | Fetch at startup; cache in memory |
| **AWS Secrets Manager** | IAM role + SDK | Use `GetSecretValue`; rotate keys periodically |
| **GCP Secret Manager** | Service account + client library | Similar to AWS |
| **Azure Key Vault** | Managed identity | Use `@azure/keyvault-secrets` |

**Rotating API keys:** Update the secret in your manager, redeploy or restart the backend. The `getApiKey()` helper in `backend/src/config/env.ts` reads from env; when integrating a vault, extend it to fetch from `SECRET_MANAGER_URL` with fallback to env for local development.
