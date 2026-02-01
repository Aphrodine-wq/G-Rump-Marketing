# How to Run G-Rump

Two simple options: **Local (your PC)** or **Docker**.

---

## Option A: Local (Your PC)

Runs directly on your machine. Best for development and quick iteration.

### Prerequisites
- Node.js 20+
- At least one AI provider key: `NVIDIA_NIM_API_KEY` or `OPENROUTER_API_KEY` in `backend/.env`

### Quick Start

**1. Install dependencies**
```bash
npm install
```

**2. Build backend**
```bash
cd backend && npm run build && cd ..
```

**3. Run**

**Desktop app (Electron):**
```bash
cd frontend && npm run electron:dev
```
Or on Windows: double-click `start-desktop.bat`

**Web app (browser):**
```bash
# Terminal 1 - backend
cd backend && npm start

# Terminal 2 - frontend
cd frontend && npm run dev
```
Or from repo root: `npm run dev` (runs both concurrently)

**4. Open**
- Desktop: app window opens automatically
- Web: http://localhost:5173
- Backend API: http://localhost:3000

---

## Option B: Docker

Fully containerized. Best for deployment or when you prefer isolation.

### Prerequisites
- Docker and Docker Compose

### Quick Start

**1. From project root**
```bash
docker compose -f deploy/docker-compose.yml up --build -d
```

**2. Access**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Redis: localhost:6379 (internal)

**3. Stop**
```bash
docker compose -f deploy/docker-compose.yml down
```

### One-Line Scripts

- **Linux/macOS:** `./scripts/run-docker.sh`
- **Windows:** `scripts\run-docker.bat`

---

## First-Time Setup

Create `backend/.env` (copy from `backend/.env.example`):

```env
NVIDIA_NIM_API_KEY=nvapi-your-key-here
# or OPENROUTER_API_KEY=sk-or-v1-your-key-here

PORT=3000
NODE_ENV=development
```

See [GETTING_STARTED.md](./GETTING_STARTED.md) for full setup and troubleshooting.
