# G-Rump Architecture

> **Version:** 2.1.0 | **Last Updated:** January 2026

For request pipeline, middleware order, and chat/codegen/ship flow, see [HOW_IT_WORKS.md](HOW_IT_WORKS.md). For the full system overview, see [OVERVIEW.md](OVERVIEW.md).

## System Overview

G-Rump is a high-performance AI development platform (**Architecture-as-Code**) that combines:
- **Svelte 5** frontend for the UI (web and desktop)
- **Desktop runtime**: Electron 28
- **Node.js/Express 5** backend for API services (SWC-compiled)
- **Rust** intent compiler for natural language processing (parallel + SIMD + WASM)
- **Multi-provider AI**: NVIDIA NIM (Kimi K2.5), OpenRouter, Groq, Together AI, Ollama
- **Multi-tier cache** (L1 LRU/L2 Redis/L3 Disk), **worker pool**, **model router** (cost-aware), **rate limiting**, **Supabase** auth, **Stripe** billing, **webhooks**, **SSE** streaming, **BullMQ** job queue

For a file-level map of the codebase, see [CODEBASE.md](./CODEBASE.md).

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    G-RUMP PLATFORM ARCHITECTURE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                         CLIENTS                                        │ │
│  │  Desktop (Electron)  │  Web App  │  VS Code  │  CLI  │  Bots  │ Docker │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                     │                                        │
│                                     ▼                                        │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                 SVELTE 5 FRONTEND (5173)                               │ │
│  │  Chat Interface │ Diagram Renderer │ Workflow Phase Bar │ Tool Cards   │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                     │                                        │
│                                     ▼                                        │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                 EXPRESS 5 BACKEND (3000)                               │ │
│  │  /api/chat │ /api/ship │ /api/codegen │ /api/architecture │ /api/prd  │ │
  │  │  G-Agent Orchestrator │ LLM Gateway │ Tool Execution │ Job Queue        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│              │                    │                    │                     │
│              ▼                    ▼                    ▼                     │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────────┐  │
│  │ Rust Intent      │  │ LLM Providers    │  │ Data Layer               │  │
│  │ Compiler         │  │ ─────────────    │  │ ─────────                │  │
│  │ (CLI + WASM)     │  │ NVIDIA NIM       │  │ SQLite/PostgreSQL        │  │
│  │                  │  │ Kimi K2.5        │  │ Redis (cache/queue)      │  │
│  │                  │  │ OpenRouter       │  │ Supabase (auth)          │  │
│  │                  │  │ Groq, Together   │  │ Stripe (billing)         │  │
│  │                  │  │ Ollama (local)   │  │ Pinecone (RAG)           │  │
│  └──────────────────┘  └──────────────────┘  └──────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technologies |
|:-----:|:------------:|
| **Desktop** | Electron 28, Svelte 5, Vite 5, TailwindCSS 3.4 |
| **Frontend** | TypeScript 5.3, Mermaid.js, Shiki, Lucide Icons, DOMPurify |
| **Backend** | Node.js 20+, Express 5, TypeScript, SWC, Pino |
| **Compiler** | Rust 1.77+, rayon, SIMD (AVX2/AVX-512), WASM |
| **AI/ML** | NVIDIA NIM, Kimi K2.5, OpenRouter, Groq, Together AI, Ollama |
| **Database** | SQLite/better-sqlite3 (dev), Supabase/PostgreSQL (prod) |
| **Queue** | BullMQ, Redis, ioredis |
| **Vector DB** | Pinecone (RAG) |
| **Infrastructure** | Docker, Kubernetes, Vercel |
| **Monitoring** | Prometheus, OpenTelemetry, Grafana, Pino |
| **Testing** | Vitest, Playwright, k6 |
| **Payments** | Stripe |

## Component Architecture

### Frontend (Svelte 5)

**Stores:**
- `sessionsStore` - Session management
- `toastStore` - Toast notifications
- `connectionStatusStore` - Backend connection status
- `authStore` - Authentication state
- `clarificationStore` - Clarification modal state
- `workflowStore` - 3-phase workflow state (Architecture → Spec → Code)
- `chatModeStore` - Design vs Code mode (tool-enabled chat)
- `workspaceStore` - Workspace root for file/bash tools
- `codeSessionsStore` - Save/load for Code-mode sessions
- `preferencesStore` - User preferences

**Components:**
- `ChatInterface` - Main chat UI (Design + Code modes)
- `DiagramRenderer` - Mermaid diagram rendering
- `WorkflowPhaseBar` - Workflow progress indicator
- `WorkflowActions` - Phase transition buttons
- `ToolCallCard` / `ToolResultCard` - Tool use display in Code mode
- `ModelPicker` - LLM model selection
- `RAGScreen` - Document-aware AI interface

### Backend (Node.js/Express 5)

**Key entry point:** `backend/src/index.ts` – mounts routes, middleware (auth, rate limit, timeout, metrics), DB, job worker, optional Redis.

**Services:**
- `claudeServiceWithTools` - Tool-enabled chat (bash, file read/write/edit, list_dir); streams via LLM gateway
- `llmGateway` - Unified streaming for OpenRouter, NIM, Zhipu (model router from `@grump/ai-core`)
- `toolExecutionService` - Tool execution (workspace-scoped); path policy via `pathPolicyService`
- `intentCompilerService` - Intent parsing via Rust CLI or WASM, with LLM enrichment
- `architectureService`, `prdGeneratorService`, `codeGeneratorService` - Architecture, PRD, codegen
- `agentOrchestrator` - G-Agent coordination and quality assurance
- `tieredCache`, `workerPool`, `batchProcessor`, `nimAccelerator` - Cache, workers, batching, NIM
- `ragService` - RAG document indexing and query

**Routes:** See [docs/API.md](./API.md). Core: `/api/chat/stream`, `/api/ship`, `/api/codegen`, `/api/plan`, `/api/spec`, `/api/diagram`, `/api/intent`, `/api/architecture`, `/api/prd`, `/api/rag`, `/api/security/*`, `/api/webhooks`, `/api/events`, `/health`, `/metrics`.

### Intent Compiler (Rust)

CLI tool that:
- Parses natural language input
- Extracts actors, features, data flows, tech stack hints
- Returns structured JSON
- Optional WASM mode for browser/Node.js

## Resource Bundling

### Electron Production Build

1. **Frontend Bundle**
   - Built with Vite: `npm run build`
   - Output: `frontend/dist/` (static files)

2. **Electron Packaging**
   - Uses electron-builder
   - Creates portable executable
   - Output: `frontend/electron-dist/G-Rump.exe`

3. **Backend** (separate)
   - Run from source or bundle separately
   - Electron auto-starts backend from `../backend/dist/`

### Electron Resource Extraction Flow

```
App Launch
    │
    ├─▶ Load splash screen
    │
    ├─▶ Look for backend at ../backend/dist/index.js
    │
    ├─▶ Start backend process (if found)
    │
    ├─▶ Load frontend from localhost:5173 (dev) or dist/ (prod)
    │
    └─▶ Close splash, show main window
```

## Data Flow

### Message Flow

**Design mode** (diagram-first):
```
User Input → ChatInterface → /api/generate-diagram-stream
    ├─▶ Intent Compiler (if needed) → grump-intent.exe
    ├─▶ LLM API → Stream (text + Mermaid)
    └─▶ ChatInterface (updates in real-time)
```

**Code mode** (Claude-Code-style, tool-enabled):
```
User Input → ChatInterface → POST /api/chat/stream
    Body: { messages, workspaceRoot?, planMode?, agentProfile? }
    ├─▶ LLM API (tools: bash, file_read, file_write, file_edit, list_directory)
    ├─▶ Tool execution (workspace-scoped)
    └─▶ SSE: text, tool_call, tool_result, done → ChatInterface
```

### Workflow Flow

```
1. Architecture Phase
   User Input → Architecture Service → Mermaid Diagram
   
2. PRD Phase
   Architecture → PRD Generator → PRD Document
   
3. Code Generation Phase
   PRD → G-Agent Orchestrator → Generated Code (ZIP)
   ├─▶ G-Agent Architecture (validation & planning)
   ├─▶ G-Agent Frontend (UI components)
   ├─▶ G-Agent Backend (APIs & services)
   ├─▶ G-Agent DevOps (Docker & CI/CD)
   ├─▶ G-Agent Testing (test suites)
   ├─▶ G-Agent Documentation (documentation)
   ├─▶ G-Agent Security (security scanning)
   ├─▶ G-Agent i18n (internationalization)
   ├─▶ G-Agent Work Report Generation (design mode)
   └─▶ G-Agent Quality Analysis (quality assurance & auto-fixes)
```

### Code Mode (Tool-Enabled Chat)

- **Workspace**: User sets a project root; all file/bash tools run relative to it.
- **Plan mode**: Optional "Plan only" toggle; model outputs a plan, no tool use.
- **G-Agent profiles**: General, Router, Frontend, Backend, DevOps, Test (specialist system prompts).
- **Sessions**: Save/load Code-mode conversations (messages, workspace, agent profile).

## Environment Configuration

### Development

- Backend runs as Node.js process with tsx
- Intent compiler from `intent-compiler/target/release/`
- Frontend dev server on port 5173

### Production

- Backend runs as Node.js process (Electron or standalone)
- Intent compiler from project root (Electron) or system path
- Frontend bundled in desktop app or served from CDN

## Security

- Electron uses `contextIsolation: true` and `nodeIntegration: false` via BrowserWindow options
- Helmet middleware on backend
- API keys and secrets in `.env` (see [PRODUCTION_CHECKLIST](./PRODUCTION_CHECKLIST.md))
- Path validation for security scan (`workspacePath` under `SECURITY_SCAN_ROOT` or cwd)
- Outbound webhook URLs: https-only in production
- Auth: Supabase JWT; optional auth for API (`REQUIRE_AUTH_FOR_API`); webhook secrets required in prod
- Content Security Policy (CSP) with report-uri
- Rate limiting via express-rate-limit with optional Redis backend

## Performance Considerations

- Backend build: SWC (fast); intent compiler: Rust with LTO/SIMD
- Tiered cache (L1/L2/L3), worker pool, model router (cost-aware), NIM batching
- See [docs/PERFORMANCE_GUIDE.md](./PERFORMANCE_GUIDE.md)

### Performance Metrics

| Operation | Traditional | G-Rump | Improvement |
|:---------:|:-----------:|:------:|:-----------:|
| Backend Build | 45s | 2.5s | **18x faster** |
| Intent Parsing | 120ms | 8ms | **15x faster** |
| CLI Startup | 850ms | 45ms | **19x faster** |
| Docker Build | 180s | 25s | **7x faster** |

### NIM, Cost Dashboard, and Intent

- **Local NIM:** Set `NVIDIA_NIM_URL` (e.g. `http://nim:8000`) when using a self-hosted or local NIM stack (e.g. `docker compose -f docker-compose.yml -f docker-compose.gpu.yml`). Omitting it uses the cloud default.
- **Cost dashboard:** The backend mounts `/api/cost` (see `costDashboard.ts`). The frontend exposes a lazy-loaded Cost dashboard (Settings → Cost dashboard, or via the cost snippet in the sidebar).
- **WASM intent:** Optional. Set `GRUMP_USE_WASM_INTENT=true` to prefer the WASM intent parser when available; otherwise the CLI is used. Build the WASM module with `./build-wasm.sh` or `build-wasm.bat` in `intent-compiler/`.

## Monorepo Packages

| Package | Description |
|---------|-------------|
| `frontend/` | Svelte 5 + Electron desktop app |
| `backend/` | Express 5 API server |
| `packages/ai-core/` | Model router and provider registry |
| `packages/cli/` | CLI commands (`@g-rump/cli`) |
| `packages/shared-types/` | Shared TypeScript types |
| `packages/rag/` | RAG engine with Pinecone |
| `packages/voice/` | Voice ASR/TTS (NVIDIA Build) |
| `packages/memory/` | Conversation memory |
| `packages/kimi/` | Kimi K2.5 optimizations |
| `packages/compiler-enhanced/` | Incremental compilation |
| `packages/vscode-extension/` | VS Code extension |

## Future Improvements

- [ ] Code splitting for backend services
- [ ] Offline mode support with local LLMs
- [ ] Real-time collaboration features
- [ ] Enhanced codebase analysis with dependency graphs
