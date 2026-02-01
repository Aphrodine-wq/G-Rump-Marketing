# Observability

This document describes tracing, metrics, and logging for the G-Rump backend.

## Distributed tracing

The backend uses **OpenTelemetry** for distributed tracing. Every HTTP request gets a correlation ID (`x-correlation-id`) and a span. The correlation ID is read from incoming headers or generated and set on the response.

### Configuration

- **`OTLP_ENDPOINT`** (optional): OTLP HTTP endpoint for trace export (e.g. `http://localhost:4318` for a local collector). If unset, traces are logged to the console in development.
- **`SERVICE_NAME`** (optional): Service name in traces (default: `grump-backend`).
- **`NODE_ENV`**: Used as deployment environment in the resource.

### Connecting a collector

1. Run an OTLP-capable collector (e.g. [Jaeger](https://www.jaeger.io/), [Grafana Tempo](https://grafana.com/docs/tempo/), or the [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/)).
2. Set `OTLP_ENDPOINT` to the collector’s OTLP HTTP URL (e.g. `http://localhost:4318/v1/traces` for the path; the backend appends `/v1/traces` if you omit it).
3. Restart the backend. Traces will be exported to the collector.

Example with a local OpenTelemetry Collector receiving on port 4318:

```bash
export OTLP_ENDPOINT=http://localhost:4318
npm run start:prod
```

## Metrics

The backend exposes **Prometheus-format metrics** at `GET /metrics`.

- In **development**, the endpoint is unauthenticated.
- In **production**, basic auth is required unless `METRICS_AUTH` is unset (in which case the endpoint returns 403). Set `METRICS_AUTH` to `user:password` (scraped by Prometheus with the same credentials).

Metrics include:

- HTTP request duration and count (by method, route, status)
- **Chat requests by session type**: `chat_requests_total{session_type="chat"|"freeAgent"}` – use this to filter or alert on Free Agent traffic in Prometheus/Grafana (e.g. `chat_requests_total{session_type="freeAgent"}`).
- Claude/LLM API duration and count
- Circuit breaker state
- Active SSE connections
- Database operation duration and count
- Context generation duration
- Tiered cache and worker pool metrics

### Grafana / Prometheus

- Configure Prometheus to scrape `http://<backend>/metrics` (with basic auth in production).
- Use Grafana to build dashboards from these metrics.

#### Consolidated observability layout (observability/)

All monitoring config lives under `observability/`:

| Path | Purpose |
|------|---------|
| `observability/prometheus.yml` | Prometheus scrape config |
| `observability/alert-rules.yml` | Alert rules (HighErrorRate, HighLatencyP95, CircuitBreakerOpen, BackendDown, DatabaseConnectionFailure, HighMemoryUsage, HighCPUUsage, NoMetricsReceived) |
| `observability/grafana/dashboards/` | Grafana dashboards: grump-backend.json, main-dashboard.json, backend-metrics.json |
| `observability/grafana/datasources/` | Grafana datasource provisioning |

#### Observability stack (Docker)

An optional observability stack with Prometheus, Grafana, and alert rules is provided:

```bash
# Create network if not exists
docker network create grump-network

# Start backend first (e.g. via deploy/docker-compose.yml), then:
docker compose -f deploy/docker-compose.yml -f deploy/docker-compose.observability.yml up -d
```

- **Prometheus**: http://localhost:9090 – scrapes backend `:3000/metrics`
- **Grafana**: http://localhost:3001 – default login `admin` / `admin`
- **Dashboard**: G-Rump Backend (HTTP rate, latency p95, SSE connections, circuit breaker, LLM duration, cache hit rate)
- **Alerts**: `observability/alert-rules.yml` – HighErrorRate, HighLatencyP95, CircuitBreakerOpen, BackendDown

On Windows/Mac, Prometheus uses `host.docker.internal:3000` to reach the backend. If the backend runs in the same compose, change the target in `observability/prometheus.yml` to `backend:3000`.

## Structured logging

Logging uses **Pino**. Every HTTP request log includes:

- **requestId**: From `x-request-id` or generated (via `cls-rtracer`).
- **correlationId**: From the tracing middleware when present.

In production, logs are JSON. In development, Pino’s pretty transport is used. Set `LOG_LEVEL` (e.g. `debug`, `info`, `warn`, `error`) to control verbosity.

## Middleware order

Correlation and tracing are applied to all routes:

1. `requestIdMiddleware` (x-request-id)
2. `tracingMiddleware` (x-correlation-id, OpenTelemetry span)
3. `httpLogger` (request/response logging with requestId and correlationId)

So all critical HTTP paths use correlation IDs and structured logging.

## Alert Response Runbook

When alerts fire from `observability/alert-rules.yml`:

| Alert | Action |
|-------|--------|
| **HighErrorRate** | Check logs for 5xx errors; verify backend health; restart if needed. |
| **HighLatencyP95** | Check LLM/cache latency; scale or add replicas. |
| **CircuitBreakerOpen** | External service (e.g. NIM) may be down; check provider status; retry after cooldown. |
| **BackendDown** | Verify backend process; check `/health/quick`; restart service. |
| **DatabaseConnectionFailure** | Check DB connectivity; verify migrations; check disk space. |
| **HighMemoryUsage** | Investigate memory leaks; consider scaling or restart. |
| **HighCPUUsage** | Check for runaway processes; optimize hot paths; scale if needed. |
| **NoMetricsReceived** | Backend `/metrics` unreachable; verify Prometheus scrape target; check firewall. |
