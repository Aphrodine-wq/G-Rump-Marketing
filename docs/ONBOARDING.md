# New Developer Onboarding

> **Last Updated:** January 2026

This guide helps new developers get oriented on day one. For install and run details, see [GETTING_STARTED.md](GETTING_STARTED.md). For architecture, see [HOW_IT_WORKS.md](HOW_IT_WORKS.md) and [ARCHITECTURE.md](ARCHITECTURE.md).

## First-Day Checklist

1. **Clone and install**
   ```bash
   git clone <repo-url>
   cd milesproject
   npm install
   cd backend && npm run build && cd ..
   ```

2. **Configure API key**  
   Create `backend/.env` with `NVIDIA_NIM_API_KEY=...` or `OPENROUTER_API_KEY=...`. See [GETTING_STARTED.md](GETTING_STARTED.md#1-get-your-api-key).

3. **Run the app**
   ```bash
   cd frontend && npm run electron:dev
   ```
   Or from root: `npm run dev` (backend + frontend web).

4. **Run tests**
   ```bash
   npm run check-all   # Type-check + lint
   npm test           # Frontend + backend unit tests
   ```

5. **Read key docs**
   - [ROOT_STRUCTURE.md](../ROOT_STRUCTURE.md) – Folder map
   - [CODEBASE.md](CODEBASE.md) – File map and entry points
   - [HOW_IT_WORKS.md](HOW_IT_WORKS.md) – Request flow, chat/codegen/ship
   - [OVERVIEW.md](OVERVIEW.md) – Modes and pathways (Chat, SHIP, Free Agent)

## Key Files (Where to Look)

| Task | Files |
|------|-------|
| **Add or change API route** | `backend/src/index.ts` (mount), `backend/src/routes/*.ts` |
| **Change chat behavior** | `backend/src/routes/chat.ts`, `backend/src/services/claudeServiceWithTools.ts` |
| **Change ship/codegen flow** | `backend/src/routes/ship.ts`, `backend/src/services/shipModeService.ts`, `backend/src/services/agentOrchestrator.ts` |
| **Add UI component** | `frontend/src/components/` |
| **Change chat UI** | `frontend/src/components/ChatInterface.svelte` |
| **Add Svelte store** | `frontend/src/stores/` |
| **Change API client** | `frontend/src/lib/api.ts` |
| **Add LLM tool** | `backend/src/tools/definitions.ts`, `backend/src/services/toolExecutionService.ts` |
| **Add skill** | `backend/src/skills/` (e.g. `code-review/`, `git-operations/`), register in `index.ts` |
| **Env/config** | `backend/src/config/env.ts`, `backend/.env` |

## How to Debug

- **Backend**: Run `cd backend && npm run dev`; logs to console. Set `LOG_LEVEL=debug` in `.env`.
- **Frontend**: Run `cd frontend && npm run dev`; Vite HMR. DevTools in Electron: Ctrl+Shift+I (Windows/Linux) or Cmd+Option+I (macOS).
- **API calls**: Use browser DevTools Network tab or `curl http://localhost:3000/health/quick`.
- **E2E**: `cd frontend && npm run test:e2e` (requires backend running).

## Where to Add Code

- **New API endpoint**: Add route in `backend/src/routes/` and mount in `backend/src/index.ts`.
- **New chat tool**: Add to `backend/src/tools/definitions.ts`, implement in `toolExecutionService.ts`.
- **New UI view**: Add component in `frontend/src/components/`, wire in `App.svelte` or `uiStore`.
- **Shared types**: `packages/shared-types/` – used by backend and frontend.
- **Model routing**: `packages/ai-core/` – used by backend for LLM selection.

## Quick Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Backend + frontend (web) concurrently |
| `cd frontend && npm run electron:dev` | Desktop app |
| `npm run check-all` | Type-check + lint |
| `npm test` | All unit tests |
| `cd frontend && npm run test:e2e` | E2E (Playwright) |
| `cd backend && npm run build` | Build backend |

## Getting Help

- [KNOWN_ISSUES.md](KNOWN_ISSUES.md) – Suppressions, workarounds
- [SETUP.md](SETUP.md) – Troubleshooting
- [RUNBOOK.md](RUNBOOK.md) – Operational procedures
