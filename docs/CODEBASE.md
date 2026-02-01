# G-Rump Codebase Map

A short map of the repository layout and main entry points. For architecture and flows, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## Monorepo layout

| Path | Purpose |
|------|---------|
| `frontend/` | Main AI tool (Svelte 5 + Vite). Chat, ship, codegen, settings. Has embedded Electron for desktop. Entry: `src/main.ts`, `src/App.svelte`. |
| `app-dashboard/` | Product dashboard (login, billing, workspace, analytics, legal). Separate Svelte app for app.g-rump.com. |
| `backend/` | Express 5 API. Entry: `src/index.ts`. |
| `packages/` | Shared packages: `ai-core`, `cli`, `shared-types`, `rag`, `voice`, `memory`, `kimi`, `compiler-enhanced`, `vscode-extension`. |
| `observability/` | Prometheus, Grafana, alert rules, dashboards (consolidated). |
| `intent-compiler/` | Rust intent parser (CLI + WASM). Entry: `src/main.rs`, `src/lib.rs`. |
| `integrations/` | VS Code extension, MCP integrations, bot skills. |
| `infrastructure/` | Terraform, CloudFormation, and cloud config templates. |
| `agentlightning/` | Agent Lightning system for autonomous agent execution. |
| `api/` | OpenAPI specs and JSON schemas. |
| `docs/` | Developer documentation. Index: [docs/README.md](./README.md). |
| `docs-site/` | User-facing documentation site (VitePress). |
| `deploy/` | Docker Compose, Kubernetes manifests, Vercel configs. |
| `scripts/` | Build, verify, benchmark scripts. |
| `archive/` | Deprecated/archived files for reference. |

## Backend (`backend/src/`)

| Area | Purpose | Main files |
|------|---------|------------|
| **routes/** | API endpoints. | `chat.ts`, `ship.ts`, `codegen.ts`, `plan.ts`, `spec.ts`, `diagram.ts`, `intent.ts`, `architecture.ts`, `prd.ts`, `auth.ts`, `webhooks.ts`, `events.ts`, `health.ts`, `billing.ts`, `rag.ts`, `voice.ts`, `memory.ts`, `vision.ts`, `workspace.ts`, `agents.ts`, `jobs.ts`, etc. |
| **services/** | Business logic. | `claudeServiceWithTools.ts`, `llmGateway.ts`, `toolExecutionService.ts`, `intentCompilerService.ts`, `architectureService.ts`, `prdGeneratorService.ts`, `codeGeneratorService.ts`, `agentOrchestrator.ts`, `tieredCache.ts`, `workerPool.ts`, `batchProcessor.ts`, `nimAccelerator.ts`, `pathPolicyService.ts`, `contextCache.ts`, `webhookService.ts`, `jobQueue.ts`, `supabaseClient.ts`, etc. |
| **middleware/** | Request pipeline. | `authMiddleware.ts`, `rateLimiter.ts`, `validator.ts`, `timeout.ts`, `metrics.ts`, `logger.ts`, `tracing.ts`. |
| **features/** | Feature modules. | `security-compliance/` (scan, SBOM, compliance, secrets audit), `codebase-analysis/`, `infrastructure/`, `testing-qa/`. |
| **db/** | Database. | `database.ts`, `supabase-db.ts`, migrations. |
| **tools/** | LLM tool definitions. | `definitions.ts` (bash, terminal_execute, file read/write/edit, list_dir, git_*, browser, etc.). |
| **prompts/** | System and mode prompts. | Chat modes, architect, PRD, agents, etc. |
| **skills/** | Extensible skills. | `base/BaseSkill.ts`, `code-review/`, `git-operations/`, `refactoring/`, `lint/`, `index.ts`. |

## Tools & skills

- **Chat tools** – First-class tools available in Code mode for every request. Defined in [backend/src/tools/definitions.ts](backend/src/tools/definitions.ts) and executed by [backend/src/services/toolExecutionService.ts](backend/src/services/toolExecutionService.ts). Include: `bash_execute`, `terminal_execute`, `file_read`, `file_write`, `file_edit`, `list_directory`, `codebase_search`, `git_status`, `git_diff`, `git_log`, `git_commit`, `git_branch`, optional `git_push` (when `ENABLE_GIT_PUSH=true`), DB schema/migrations, and browser/screenshot helpers. All run workspace-scoped with path policy from [pathPolicyService.ts](backend/src/services/pathPolicyService.ts).
- **Skills** – Extensible modules that add tools and routes. Registered in [backend/src/skills/index.ts](backend/src/skills/index.ts). Each skill can expose extra tools (e.g. git-operations: `generate_commit_message`, `git_status`, `create_commit`, `generate_pr_description`) and dedicated API routes. Use skills for richer workflows (e.g. PR description generation); use chat tools for immediate file/git/terminal actions in conversation.
| **workers/** | Worker threads. | `cpuBoundWorker.ts` (CPU-bound tasks). |
| **config/** | Config and env. | `env.ts`, `runtime.ts`. |
| **utils/** | Helpers. | `logger.ts`, `errorResponse.ts`, `outputFilters.ts`, etc. |
| **mcp/** | MCP server. | `grump-server.ts`. |

## Frontend (`frontend/src/`)

| Area | Purpose |
|------|---------|
| **components/** | UI components. `ChatInterface.svelte`, `DiagramRenderer`, `WorkflowPhaseBar`, `ProjectsDashboard`, `SettingsScreen`, `SpecMode`, etc. |
| **stores/** | Svelte stores. `sessionsStore`, `authStore`, `workflowStore`, `specStore`, `clarificationStore`, `featuresStore`, `uiStore`, etc. |
| **lib/** | Design system, API client, mermaid, etc. |
| **main.ts** | App entry. |
| **App.svelte** | Root component. |

## Packages

| Package | Purpose |
|---------|---------|
| **packages/ai-core** | Model router (`route()`) and model registry. Used by backend for provider/model selection. |
| **packages/cli** | CLI commands (`grump ship`, `plan`, `analyze`, `cache-clear`, `config`). |
| **packages/shared-types** | Shared TypeScript types (spec, PRD, messages, etc.). |
| **packages/rag** | RAG (Retrieval-Augmented Generation) engine types/utilities. |
| **packages/voice** | Voice ASR/TTS integration (NVIDIA Build). |
| **packages/memory** | Conversation memory and context management. |
| **packages/kimi** | Kimi K2.5 model optimizations and utilities. |
| **packages/compiler-enhanced** | Incremental compilation enhancements. |
| **packages/vscode-extension** | VS Code extension with chat, SHIP workflow, and code intelligence. |

## Key entry points

- **Backend server**: `backend/src/index.ts` – mounts routes, middleware, DB, job worker.
- **Chat API**: `backend/src/routes/chat.ts` → `claudeServiceWithTools.generateChatStream`; model selection via `route()` from `@grump/ai-core`.
- **Frontend app**: `frontend/src/main.ts` → `App.svelte`; chat UI in `ChatInterface.svelte`.
- **Intent parsing**: `backend/src/services/intentCompilerService.ts` (Rust CLI or WASM).
- **Security scan**: `backend/src/features/security-compliance/routes.ts` and `service.ts` (path-validated).

For API endpoints by domain, see [docs/API.md](./docs/API.md) (or README and CURSOR_GRUMP_API).
