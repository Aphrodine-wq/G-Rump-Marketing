# API Versioning Strategy

This document defines the versioning strategy for the G-Rump backend API.

## Strategy

G-Rump uses **URL path prefix** versioning: `/api/v1/` for versioned routes.

### Version Format

- **Current**: `/api/*` (unversioned, default)
- **Future**: `/api/v1/*` for versioned endpoints

### Migration Plan

1. **Phase 1 (current)**: All routes live under `/api/`. No breaking changes.
2. **Phase 2**: New routes are added under `/api/v1/`. Legacy `/api/*` remains supported.
3. **Phase 3**: Add `Sunset` header to legacy routes (e.g. `Sunset: Sat, 01 Jan 2027 00:00:00 GMT`).
4. **Phase 4**: Deprecate legacy routes after sunset date. Redirect or return 410 Gone.

### Implementation

When introducing v1:

```typescript
// backend/src/index.ts
app.use('/api/v1', diagramRoutes);
app.use('/api/v1/intent', intentRoutes);
// ... etc

// Legacy (during migration)
app.use('/api', diagramRoutes);
app.use('/api/intent', intentRoutes);
```

### Alternative: Header-Based Versioning

If URL prefix is undesirable, use Accept header:

```
Accept: application/vnd.grump.v1+json
```

The backend would inspect the Accept header and route accordingly. This is optional and can be added later.

### Breaking Changes

A **major** version bump (v1 → v2) is required when:

- Removing or renaming request/response fields
- Changing response structure
- Changing authentication requirements
- Removing endpoints

**Minor** changes (backward-compatible) do not require a new version:

- Adding optional query parameters
- Adding optional request body fields
- Adding new endpoints
- Adding new response fields (optional)

### Deprecated request fields

- **`planMode`** (POST `/api/chat/stream`): Deprecated in v1.x. Use `mode: 'plan'` instead. Support will be removed in v2.0. The backend accepts `planMode` for backward compatibility and falls back to it when `mode` is not set.

### Documentation

- [docs/API.md](API.md) documents the current API.
- Swagger/OpenAPI specs should include a `version` field when versioning is active.
