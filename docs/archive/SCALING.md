# Scalability and Production

This document describes how to run G-Rump for production scaling: session storage with Redis, horizontal scaling, and load balancing. **Production scaling today uses SQLite + Redis**; PostgreSQL is planned for a future release.

## Session storage

The backend supports **SQLite** (single-instance, file-based) or **Redis** (shared across instances). See [backend/src/services/sessionStorage.ts](../backend/src/services/sessionStorage.ts).

### Using Redis for session storage

For **multi-instance production**, use Redis so sessions are shared across backend replicas.

1. **Environment variables**
   - `REDIS_HOST` – Redis host (e.g. `localhost` or your Redis service).
   - `REDIS_PORT` – Optional; default `6379`.
   - `REDIS_PASSWORD` – Optional; set if Redis requires auth.
   - `SESSION_STORAGE=redis` – Force Redis for session storage. If unset, Redis is used when `REDIS_HOST` is set and `NODE_ENV=production`.

2. **Behavior**
   - With Redis: sessions (generation, ship, plan, spec) are stored in Redis with a 24-hour TTL.
   - Without Redis (or if Redis is down): storage falls back to SQLite or in-memory per the implementation. For multiple backend instances, **do not rely on in-memory**; always configure Redis (or another shared store) for production.

3. **Docker Compose**
   - Use a Redis service in your stack. Example (add to your `docker-compose.yml`):
     ```yaml
     redis:
       image: redis:7-alpine
       ports: ["6379:6379"]
       healthcheck:
         test: ["CMD", "redis-cli", "ping"]
         interval: 10s
         timeout: 5s
         retries: 5
     ```
   - Set `REDIS_HOST=redis` and `SESSION_STORAGE=redis` (or rely on `NODE_ENV=production` + `REDIS_HOST`) for backend services.

See [RUNBOOK_REDIS.md](RUNBOOK_REDIS.md) for behavior when Redis is unavailable.

## Horizontal scaling

- **Stateless backend**: The API is designed to be stateless. Any persistent state (sessions, rate limits, job queues) uses Redis or the database.
- **Session storage**: Use Redis (see above) so all instances see the same sessions.
- **Rate limiting**: When `REDIS_HOST` is set, rate limiting uses Redis and is shared across instances. Without Redis, each instance has its own in-memory limit.
- **Job queue (BullMQ)**: When `REDIS_HOST` is set, SHIP/codegen jobs use Redis-backed BullMQ. Run one or more backend instances; workers can run on the same or separate processes.
- **Load balancing**: Put a reverse proxy (e.g. nginx, Caddy, or a cloud load balancer) in front of multiple backend instances. No sticky sessions required if Redis is used for sessions and rate limiting.

## Caching

- **Tiered cache**: When Redis is available, the backend uses L1 (memory) + L2 (Redis) + L3 (disk) for context and other caches. See [RUNBOOK_REDIS.md](RUNBOOK_REDIS.md).
- **LLM/RAG caching**: Caching strategy for LLM responses or RAG is application-specific; document or implement as needed. The current codebase uses the tiered cache for context; extending it for response caching is optional.

## Summary

| Goal                | Action |
|---------------------|--------|
| Multi-instance      | Set `REDIS_HOST` and `SESSION_STORAGE=redis` (or rely on production + `REDIS_HOST`). |
| Shared rate limits  | Set `REDIS_HOST`. |
| Shared job queue    | Set `REDIS_HOST`; BullMQ uses Redis. |
| Load balancing      | Reverse proxy to multiple backends; no sticky sessions needed with Redis. |
