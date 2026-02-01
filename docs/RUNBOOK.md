# G-Rump Operations Runbook

Operational procedures for running and troubleshooting G-Rump in production. **Last verified:** Checklist pass per [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md) (check-all, tests, env, observability).

## Startup

### Local Development

```bash
# From project root
npm run dev
# Or: .\start-app.bat (Windows)
```

Backend: `http://localhost:3000`  
Frontend: `http://localhost:5173`

### Production (Docker)

```bash
docker compose -f deploy/docker-compose.yml up -d
```

### Health Checks

- **Quick**: `GET /health/quick` – API key status, no external calls
- **Live**: `GET /health/live` – Process alive, memory usage
- **Ready**: `GET /health/ready` – Database, Redis (if configured), NIM/OpenRouter
- **Detailed**: `GET /health/detailed` – Full component status

```bash
curl http://localhost:3000/health/quick
```

## Logs

- **Location**: Stdout (JSON in production, pretty in development)
- **Correlation ID**: Every request has `x-correlation-id` in the response. Use it to trace a request across logs.
- **Log level**: Set `LOG_LEVEL=debug|info|warn|error` (default: `info`)

To find logs for a specific request:

```bash
# In your log aggregator, search for:
correlationId:"abc-123-xyz"
```

## Common Errors

| Symptom | Cause | Action |
|---------|-------|--------|
| 401 on `/api/*` | API key missing/invalid | Set `NVIDIA_NIM_API_KEY` or `OPENROUTER_API_KEY` in `.env` |
| 503 on `/health/ready` | NIM/OpenRouter unreachable | Check network; verify API key; check provider status pages |
| Rate limit (429) | Too many requests | Increase rate limit or use Redis for distributed limiting |
| Circuit breaker open | Upstream (NIM/OpenRouter) failing | Wait for half-open; check provider status; verify API key |
| Connection refused | Backend not running | Start backend; check port 3000 |

## Scaling

See [SCALING.md](SCALING.md) for:

- Horizontal scaling with load balancer
- Redis for session storage, rate limiting, cache
- Session affinity for SSE streams

## Rotate API Keys

1. Generate new key from [NVIDIA Build](https://build.nvidia.com/) or [OpenRouter](https://openrouter.ai/).
2. Update the secret in your deployment (Vercel env, Kubernetes Secret, etc.).
3. Redeploy or restart the backend.
4. Revoke the old key in the provider console.

**Secure API key handling**: In production, use your platform’s secret store (Vercel env, Kubernetes Secrets, etc.) and never commit `.env`. See [SECURITY_BASELINE.md](SECURITY_BASELINE.md) for controls and incident response.

## Incident Response

1. **Rotate** API keys and webhook secrets if compromise suspected.
2. **Disable** external integrations (webhooks, Twilio, Stripe) if needed.
3. **Review** logs and access patterns.
4. **Notify** users if data may be impacted.

See [SECURITY_BASELINE.md](SECURITY_BASELINE.md) for full incident response details.

## Metrics and Observability

- **Metrics**: `GET /metrics` (Prometheus format; requires `METRICS_AUTH` in production)
- **Dashboard**: Grafana stack – see [OBSERVABILITY.md](OBSERVABILITY.md)
- **Alerts**: `observability/alert-rules.yml` – HighErrorRate, HighLatencyP95, CircuitBreakerOpen, BackendDown
- **Running the observability stack**: `docker compose -f deploy/docker-compose.observability.yml up -d` (Prometheus, Grafana, alerting). See [deploy/docker-compose.observability.yml](../deploy/docker-compose.observability.yml) and [observability/](../observability/) for config.

**Deploy-specific:** For production, set `METRICS_AUTH` (Basic auth) and restrict `/metrics` to your monitoring network. Observability stack (Prometheus, Grafana, alert rules) is optional; use the same docker-compose file in your deploy pipeline or run it alongside the app.

## Cost Dashboard

- In-app: Settings → Cost dashboard
- API: `GET /api/cost/summary`, `GET /api/cost/stats`

## Related Docs

- [GETTING_STARTED.md](GETTING_STARTED.md) – Setup and run options
- [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md) – Pre-production checklist and [Verification](PRODUCTION_CHECKLIST.md#verification-ensure-software-works-as-intended) (CI, local, production, optional smoke)
- [SCALING.md](SCALING.md) – Horizontal scaling
- [OBSERVABILITY.md](OBSERVABILITY.md) – Tracing, metrics, logging
- [SECURITY_BASELINE.md](SECURITY_BASELINE.md) – Security controls
- [RUNBOOK_REDIS.md](RUNBOOK_REDIS.md) – Redis-specific operations (if present)
