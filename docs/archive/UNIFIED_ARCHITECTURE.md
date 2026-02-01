# G-Rump Unified Architecture

A single, connected view of the complete system—from user actions through backend services to external providers and back.

---

## Complete System Diagram

```mermaid
flowchart TB
    subgraph Clients["Client Layer"]
        Desktop[Desktop App<br/>Electron + Svelte]
        Web[Web App<br/>Svelte]
        VSCode[VS Code Extension]
        CLI[CLI<br/>grump ship / chat]
        Moltbot[Moltbot / Clawdbot]
    end

    subgraph Backend["grump-backend (Express)"]
        direction TB

        subgraph Routes["API Routes"]
            ChatRoute["/api/chat/stream"]
            ShipRoute["/api/ship"]
            DiagramRoute["/api/diagram"]
            CodegenRoute["/api/codegen"]
            PlanRoute["/api/plan"]
            SpecRoute["/api/spec"]
            ArchRoute["/api/architecture"]
            PRDRoute["/api/prd"]
        end

        subgraph Services["Core Services"]
            Intent[Intent Compiler<br/>Rust CLI / WASM]
            ClaudeTools[Claude + Tools<br/>bash, file_read, etc.]
            ArchSvc[Architecture Service]
            PRDSvc[PRD Generator]
            CodegenSvc[Code Generator]
            Orchestrator[Agent Orchestrator]
        end

        subgraph Agents["Specialized Agents"]
            A1[Architect]
            A2[Frontend]
            A3[Backend]
            A4[DevOps]
            A5[Test]
            A6[Docs]
        end

        subgraph Infra["Performance & Cache"]
            Cache[Tiered Cache<br/>L1 → L2 → L3]
            Router[Model Router<br/>Cost-aware]
            Workers[Worker Pool]
        end

        subgraph Tools["Supporting"]
            ToolExec[Tool Execution<br/>workspace-scoped]
            WRunner[WRunner<br/>QA & fixes]
        end
    end

    subgraph Data["Data Layer"]
        SQLite[(SQLite)]
        Redis[(Redis)]
    end

    subgraph External["External Services"]
        LLM[LLM Gateway]
        Supabase[(Supabase<br/>Auth)]
        Stripe[Stripe]
        GitHub[GitHub]
    end

    subgraph Providers["LLM Providers"]
        NIM[NVIDIA NIM<br/>Kimi K2.5]
        OpenRouter[OpenRouter]
        Zhipu[Zhipu]
    end

    %% Client → Backend
    Desktop --> ChatRoute
    Desktop --> ShipRoute
    Desktop --> DiagramRoute
    Web --> ChatRoute
    Web --> ShipRoute
    VSCode --> ChatRoute
    CLI --> ShipRoute
    CLI --> PlanRoute
    Moltbot --> ChatRoute

    %% Route → Service flows
    ChatRoute --> ClaudeTools
    ChatRoute --> ToolExec
    DiagramRoute --> Intent
    DiagramRoute --> ArchSvc
    ShipRoute --> Intent
    ShipRoute --> ArchSvc
    ArchRoute --> ArchSvc
    PRDRoute --> PRDSvc
    CodegenRoute --> CodegenSvc
    PlanRoute --> ClaudeTools
    SpecRoute --> ClaudeTools

    %% Service → Service
    Intent --> ArchSvc
    ArchSvc --> PRDSvc
    PRDSvc --> Orchestrator
    CodegenSvc --> Orchestrator
    Orchestrator --> A1
    A1 --> A2
    A1 --> A3
    A2 --> A4
    A3 --> A4
    A4 --> A5
    A5 --> A6
    A6 --> WRunner

    %% LLM path with cache
    ClaudeTools --> Cache
    ArchSvc --> Cache
    PRDSvc --> Cache
    Orchestrator --> Cache
    Cache --> Router
    Router --> LLM
    LLM --> NIM
    LLM --> OpenRouter
    LLM --> Zhipu

    %% Data
    Backend --> SQLite
    Backend --> Redis
    Backend --> Supabase
    Backend --> Stripe
    Backend --> GitHub
```

---

## End-to-End Flows

### 1. Design Mode (Diagram)

```
User types "login flow" in Chat
  → /api/generate-diagram-stream
  → Intent Compiler (extracts actors, features)
  → LLM (via Cache → Router → NIM/OpenRouter)
  → Mermaid diagram streamed back
  → DiagramRenderer displays
```

### 2. Code Mode (Tool-Enabled Chat)

```
User types "create a button" in Code mode
  → /api/chat/stream
  → Claude + Tools (file_write, bash, etc.)
  → Tool Execution (workspace-scoped)
  → LLM responds with tool calls
  → Tools run, results streamed back
  → ChatInterface updates
```

### 3. Ship Flow (Architecture → PRD → Code)

```
User triggers SHIP
  → /api/ship
  → Intent Compiler → Architecture Service (C4 diagrams)
  → PRD Generator (requirements doc)
  → Agent Orchestrator (Architect → Frontend → Backend → DevOps → Test → Docs)
  → WRunner (QA & auto-fixes)
  → ZIP download / GitHub push
```

### 4. Caching Path

```
Any LLM request
  → Tiered Cache check (L1 memory → L2 Redis → L3 disk)
  → Hit: return cached response
  → Miss: Model Router picks provider (cost-aware)
  → NIM / OpenRouter / Zhipu
  → Response cached for next time
```

---

## Component Legend

| Layer | Components |
|-------|------------|
| **Clients** | Desktop (Electron+Svelte), Web (Svelte), VS Code, CLI, Moltbot |
| **Backend** | Express API, routes, services, agents |
| **Data** | SQLite (primary), Redis (optional cache/rate-limit) |
| **External** | Supabase (auth), Stripe (billing), GitHub (repos) |
| **LLM** | NVIDIA NIM, OpenRouter, Zhipu (routed by cost/availability) |

---

## Related Docs

- [ARCHITECTURE.md](./ARCHITECTURE.md) – Component details, stores, routes
- [API.md](./API.md) – Full API reference
- [PERFORMANCE_GUIDE.md](./PERFORMANCE_GUIDE.md) – Cache, workers, optimization
