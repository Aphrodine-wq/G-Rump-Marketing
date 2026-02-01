# Getting Started with G-Rump

> **Last Updated:** January 2026

Welcome! This guide will get you from zero to running G-Rump in under 10 minutes. It consolidates install, run options (local vs Docker), and quick reference.

## Prerequisites

- **Node.js 20+** ([Download](https://nodejs.org/))
- **NVIDIA NIM API key** ([Get free key](https://build.nvidia.com/)) OR **OpenRouter API key** ([Get key](https://openrouter.ai/))
- (Optional) **Docker** for containerized deployment

## Quick start (TL;DR)

```bash
# 1. Install
npm install
cd backend && npm run build && cd ..

# 2. Configure (create backend/.env)
# Add: NVIDIA_NIM_API_KEY=nvapi-your-key  (or OPENROUTER_API_KEY=...)

# 3. Run
cd frontend && npm run electron:dev
```

| Use case | Command |
|----------|--------|
| **Desktop app** | `cd frontend && npm run electron:dev` or Windows: `start-desktop.bat` |
| **Web (both)** | From repo root: `npm run dev` (backend + frontend concurrently) |
| **Web (separate)** | Terminal 1: `cd backend && npm start`; Terminal 2: `cd frontend && npm run dev` |
| **Docker** | `docker compose -f deploy/docker-compose.yml up --build -d` or `./scripts/run-docker.sh` (Linux/macOS), `scripts\run-docker.bat` (Windows) |
| **CLI** | `npm i -g grump-cli` then `grump ship "your idea"` |

## Choose Your Path

### Option 1: Desktop App (Recommended for Beginners)

The easiest way to run G-Rump locally with a native app experience.

```bash
# 1. Clone and install
cd frontend && npm install
cd ../backend && npm install && npm run build

# 2. Run the desktop app
cd ../frontend
npm run electron:dev
```

**Or build a portable executable:**
```bash
cd frontend
npm run electron:build
# Output: frontend/electron-dist/G-Rump.exe (Windows)
```

**Windows Desktop:** Close hides to the system tray (Quit from tray to exit). Press **Ctrl+Shift+G** to show G-Rump from anywhere. Tray menu: New chat, Settings, Open workspace folder. See [SETUP.md](SETUP.md#2-desktop-app-electron---recommended) for more.

### Option 2: Web (Self-Hosted)

For teams or shared access. Run locally: from repo root `npm run dev` (runs backend + frontend concurrently), or run backend and frontend in separate terminals (see Quick start table above). For production deploy, see backend/DEPLOY_VERCEL.md; configure security per [SECURITY_BASELINE.md](SECURITY_BASELINE.md) and [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md). For tracing, metrics, and logging see [OBSERVABILITY.md](OBSERVABILITY.md).

### Option 3: CLI

For scripts, automation, and terminal workflows.

```bash
# Install globally
npm install -g grump-cli

# Configure and use
grump config set apiUrl http://localhost:3000
grump auth login
grump ship "Build a todo app with auth"
```

### Option 4: Docker

Full isolation with all dependencies included.

```bash
# From project root
docker compose -f deploy/docker-compose.yml up --build -d

# Or use one-line scripts: ./scripts/run-docker.sh (Linux/macOS), scripts\run-docker.bat (Windows)

# Access: frontend http://localhost:5173, backend http://localhost:3000
# Stop: docker compose -f deploy/docker-compose.yml down
```

## First-Time Setup

### 1. Get Your API Key

**NVIDIA NIM** (Recommended for Kimi K2.5):
1. Visit [build.nvidia.com](https://build.nvidia.com/)
2. Create an account or sign in
3. Go to API Keys section
4. Create a new key (starts with `nvapi-`)

**OpenRouter** (Multi-model access):
1. Visit [openrouter.ai](https://openrouter.ai/)
2. Sign up and go to Keys
3. Create a key (starts with `sk-or-v1-`)

### 2. Configure Environment

Create `backend/.env`:
```env
# Required - use your actual key
NVIDIA_NIM_API_KEY=nvapi-your-key-here
# or OPENROUTER_API_KEY=sk-or-v1-your-key-here

PORT=3000
NODE_ENV=development
```

### 3. Verify Installation

```bash
# Check backend health
curl http://localhost:3000/health/quick

# Should return:
# {"status":"healthy","checks":{"api_key_configured":true,...}}
```

## Your First Project

On first launch, the **setup screen** is shown (you can complete it or skip to get to the main chat). See [KNOWN_ISSUES.md](KNOWN_ISSUES.md#screens) for how SetupScreen is wired.

1. **Open G-Rump** (desktop app or browser at http://localhost:5173)
2. **Describe your project**: "Build a todo app with user authentication"
3. **Generate Architecture**: Click "Generate Architecture" to see system diagrams
4. **Generate PRD**: Click "Generate PRD" for a detailed requirements document
5. **Generate Code**: Select your tech stack and click "Generate Code"
6. **Download**: Get your complete project as a ZIP file

## Key files

| File | Purpose |
|------|--------|
| `backend/.env` | API keys and config (copy from `backend/.env.example`) |
| `frontend/.env` | Optional: custom API URL (e.g. `VITE_API_URL`) |
| `deploy/docker-compose.yml` | Docker deployment |
| `scripts/run-docker.sh`, `scripts/run-local.sh` | One-line run scripts (Linux/macOS) |
| `scripts/run-docker.bat`, `scripts/run-local.bat` | One-line run scripts (Windows) |

## Next Steps

- **Detailed Setup**: See [SETUP.md](./SETUP.md) for comprehensive configuration
- **How it works**: Request pipeline and chat/codegen/ship flows in [HOW_IT_WORKS.md](./HOW_IT_WORKS.md)
- **Architecture**: [ARCHITECTURE.md](./ARCHITECTURE.md)
- **API Reference**: [API.md](./API.md)
- **Quick Reference**: Commands and shortcuts in [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
- **Production**: [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "AI provider required" error | Add NVIDIA_NIM_API_KEY or OPENROUTER_API_KEY to backend/.env |
| 401 Unauthorized | Check API key in backend/.env; if using auth, ensure you're signed in and REQUIRE_AUTH_FOR_API is set as intended |
| Port already in use | Backend auto-finds next port; check console for actual port |
| "Disconnected" in frontend | Ensure backend is running (`npm run dev` in backend/) |
| CORS errors | Add your origin to CORS_ORIGINS in backend/.env |

For more help, see [SETUP.md](./SETUP.md) and [KNOWN_ISSUES.md](./KNOWN_ISSUES.md).

## Help & Support

- 📚 [Documentation Index](./README.md)
- 🔧 [Setup Guide](./SETUP.md)
- 🐛 [Known Issues](./KNOWN_ISSUES.md)
- 🚨 [Runbook](./RUNBOOK.md)

---

**Welcome to G-Rump!** 🚀
