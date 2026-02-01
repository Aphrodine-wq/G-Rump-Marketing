# G-Rump Documentation

> **Version:** 2.1.0 | **Last Updated:** January 2026

Welcome to G-Rump documentation. This guide helps you find what you need quickly.

---

## Quick Start

| I want to... | Go to |
|--------------|-------|
| **Get running in 5 minutes** | [GETTING_STARTED.md](GETTING_STARTED.md) |
| **Understand how it works** | [HOW_IT_WORKS.md](HOW_IT_WORKS.md) |
| **See the full system overview** | [OVERVIEW.md](OVERVIEW.md) |
| **See the API reference** | [API.md](API.md) |
| **Deploy to production** | [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md) |

---

## Core Documentation

### Getting Started
- **[GETTING_STARTED.md](GETTING_STARTED.md)** - Install and run (local, Docker, CLI)
- **[SETUP.md](SETUP.md)** - Detailed setup for all platforms
- **[ONBOARDING.md](ONBOARDING.md)** - New developer guide
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Commands and env cheat sheet

### Understanding the System
- **[OVERVIEW.md](OVERVIEW.md)** - Complete system overview, architecture philosophy
- **[HOW_IT_WORKS.md](HOW_IT_WORKS.md)** - Request pipeline, chat/codegen/ship flows
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture and components
- **[CODEBASE.md](CODEBASE.md)** - Repository structure map
- **[INTENT_COMPILER.md](INTENT_COMPILER.md)** - Rust intent compiler details

### Features & Capabilities
- **[CAPABILITIES.md](CAPABILITIES.md)** - Feature overview and API domains
- **[AGENT_SYSTEM.md](AGENT_SYSTEM.md)** - Multi-agent orchestration
- **[AI_WORKFLOWS.md](AI_WORKFLOWS.md)** - AI workflow patterns
- **[BACKENDS.md](BACKENDS.md)** - LLM provider configuration

### API & Reference
- **[API.md](API.md)** - Complete API reference
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Commands and env cheat sheet
- **[INTEGRATIONS.md](INTEGRATIONS.md)** - Third-party integrations (Discord, Telegram, Twilio)

### Operations & Production
- **[PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md)** - Deployment readiness
- **[SECURITY_BASELINE.md](SECURITY_BASELINE.md)** - Security requirements
- **[RUNBOOK.md](RUNBOOK.md)** - Operational runbook for incidents
- **[OBSERVABILITY.md](OBSERVABILITY.md)** - Monitoring, metrics, and alerting
- **[PERFORMANCE_GUIDE.md](PERFORMANCE_GUIDE.md)** - Performance optimization

### Development
- **[TESTING.md](TESTING.md)** - Testing strategy
- **[KNOWN_ISSUES.md](KNOWN_ISSUES.md)** - Known issues and workarounds
- **[ROADMAP.md](ROADMAP.md)** - Future plans and version milestones

### Legal
- [legal/TERMS_OF_SERVICE.md](legal/TERMS_OF_SERVICE.md)
- [legal/PRIVACY_POLICY.md](legal/PRIVACY_POLICY.md)
- [legal/ACCEPTABLE_USE_POLICY.md](legal/ACCEPTABLE_USE_POLICY.md)

---

## Package Documentation

| Package | Description | Docs |
|---------|-------------|------|
| **@g-rump/cli** | Command-line interface | [packages/cli/README.md](../packages/cli/README.md) |
| **@grump/ai-core** | Model router & registry | [packages/ai-core/README.md](../packages/ai-core/README.md) |
| **@grump/shared-types** | Shared TypeScript types | [packages/shared-types/README.md](../packages/shared-types/README.md) |
| **vscode-extension** | VS Code extension | [packages/vscode-extension/README.md](../packages/vscode-extension/README.md) |
| **compiler-enhanced** | Incremental compilation | [packages/compiler-enhanced/README.md](../packages/compiler-enhanced/README.md) |

---

## Component Documentation

| Component | Description | Docs |
|-----------|-------------|------|
| **Frontend** | Svelte 5 desktop/web app | [frontend/README.md](../frontend/README.md) |
| **Backend** | Express 5 API server | [backend/README.md](../backend/README.md) |
| **Deploy** | Docker & Kubernetes | [deploy/README.md](../deploy/README.md) |
| **Intent Compiler** | Rust NL parser | [intent-compiler/](../intent-compiler/) |

---

## Architecture Decision Records (ADRs)

ADRs document significant architectural decisions:

- [adr/README.md](adr/README.md) - ADR index
- [adr/0001-use-swc-for-compilation.md](adr/0001-use-swc-for-compilation.md) - SWC compiler choice
- [adr/0007-secure-api-key-storage.md](adr/0007-secure-api-key-storage.md) - API key security

---

## Archive

Older, superseded, or specialized documentation is in [archive/](archive/). These are kept for reference but the primary content lives in the docs above.

---

## External Documentation

- **[docs-site/](../docs-site/)** - VitePress user-facing documentation (docs.g-rump.com)
- **[app-dashboard/](../app-dashboard/)** - Product dashboard (app.g-rump.com)

---

## Getting Help

1. [KNOWN_ISSUES.md](KNOWN_ISSUES.md) - Common problems and solutions
2. [SETUP.md](SETUP.md#troubleshooting) - Troubleshooting setup issues
3. [RUNBOOK.md](RUNBOOK.md) - Operational issues and recovery
4. [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Quick command reference

---

## Documentation Updates

This documentation is actively maintained. For the latest changes:
- See [CHANGELOG.md](../CHANGELOG.md) for version history
- Check [ROADMAP.md](ROADMAP.md) for upcoming features
- Review [CLAUDE.md](../CLAUDE.md) for AI assistant context

---

**Quick links:** [Main README](../README.md) | [Getting Started](GETTING_STARTED.md) | [API](API.md) | [Overview](OVERVIEW.md)
