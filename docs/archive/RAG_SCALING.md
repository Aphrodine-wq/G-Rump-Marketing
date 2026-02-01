# RAG Scaling and Multi-Tenancy

This document describes how to run RAG (Retrieval-Augmented Generation) at scale: vector store options (file vs Pinecone), namespaces for multi-tenancy, indexing, and environment variables.

## Vector store options

The backend supports two vector stores for RAG:

1. **File (default)** – Single JSON file per index. Suitable for development and small corpora. Set `RAG_INDEX_PATH` (default `./data/rag-index.json`).
2. **Pinecone** – Managed vector database. Use for large corpora, high QPS, and multi-tenant isolation via namespaces. Set `RAG_VECTOR_STORE=pinecone` and Pinecone env vars below.

## Environment variables

### RAG (general)

| Variable | Description |
|---------|-------------|
| `NVIDIA_NIM_API_KEY` | Required for embeddings (and optional RAG LLM). |
| `RAG_INDEX_PATH` | File store path (default `./data/rag-index.json`). Ignored when using Pinecone. |
| `RAG_EMBED_MODEL` | Embedding model (default `nvidia/nv-embedqa-e5-v5`). |
| `RAG_LLM_MODEL` | Override for RAG answer generation; otherwise the model router selects by context size. |
| `RAG_CONTEXT_ENABLED` | Set to `true` to enable RAG context injection in chat (or use request body `includeRagContext: true`). |
| `RAG_CLAUDE_FALLBACK` | Set to `true` to fall back to Claude when primary RAG LLM fails or confidence is low (requires `ANTHROPIC_API_KEY`). |
| `RAG_NAMESPACE` | Default namespace for indexer script (or use `--namespace=value`). |

### Pinecone

| Variable | Description |
|----------|-------------|
| `RAG_VECTOR_STORE` | Set to `pinecone` to use Pinecone. |
| `PINECONE_API_KEY` | Pinecone API key (required when using Pinecone). |
| `PINECONE_INDEX` | Pinecone index name (required when using Pinecone). |
| `PINECONE_NAMESPACE` | Default namespace (e.g. `default`). Omit to use `default`. |
| `PINECONE_HOST` | Optional custom Pinecone endpoint. |

Ensure your Pinecone index dimension matches the embedding model output (e.g. NIM embed models). Create the index in the Pinecone console with the correct dimension before indexing.

## Namespaces (multi-tenant)

Namespaces isolate data per workspace or project. Use a stable id (e.g. workspace id, project id) as the namespace.

- **Query**: POST `/api/rag/query` body can include `namespace: string`. Results are scoped to that namespace.
- **Reindex**: POST `/api/rag/reindex` body can include `namespace: string`. Chunks are written to that namespace; a full reindex for that namespace clears it first.
- **Indexer script**: Run `RAG_NAMESPACE=workspace-123 npm run rag:index` or `npm run rag:index -- --namespace=workspace-123` (from backend) to index into a specific namespace.
- **Chat / Ship / Voice**: When `workspaceRoot` or `workspaceId` is provided, RAG context and queries use that as the namespace where applicable.

## Indexer script

From the backend directory:

```bash
cd backend
npm run rag:index
```

This walks `docs`, `docs-site`, `backend/src`, `frontend/src`, and `packages`, chunks and embeds content, and writes to the configured vector store. For file store, output goes to `RAG_INDEX_PATH`. For Pinecone, chunks are upserted into the index (default namespace unless `RAG_NAMESPACE` or `--namespace` is set).

Optional:

- `RAG_NAMESPACE=my-workspace npm run rag:index` – index into namespace `my-workspace`.
- `npm run rag:index -- --namespace=my-workspace` – same via CLI.

Requires `NVIDIA_NIM_API_KEY`. For Pinecone, also set `PINECONE_API_KEY` and `PINECONE_INDEX`.

## API summary

| Endpoint | Body | Description |
|----------|------|-------------|
| POST `/api/rag/query` | `query`, optional `outputFormat`, `structuredSchema`, `types`, `hybrid`, `namespace` | Run RAG query; optional namespace for multi-tenant. |
| POST `/api/rag/reindex` | `docs`, optional `namespace` | Index documents; optional namespace. Protect with `REINDEX_SECRET` in production. When `REINDEX_SECRET` is not set, the endpoint accepts requests (e.g. from the Ask docs upload UI). |

## Ask docs UI

The frontend **Ask docs** screen (sidebar, Command Palette, onboarding, chat empty state) provides:

- **Query**: Natural or structured output; types filter (doc, code, spec); hybrid search; workspace namespace.
- **Upload**: Drop or pick files (.md, .ts, .tsx, .svelte, etc.) to add documents to the RAG index. Uses workspace as namespace when set.

## RAG context in AI flows

RAG context can be injected into:

- **Chat** – Set `RAG_CONTEXT_ENABLED=true` or send `includeRagContext: true` in the request; last user message is used as the retrieval query; `workspaceRoot` is used as namespace when provided.
- **Ship** – Design, Spec, Plan, and Code phases each fetch RAG context from the project description (and phase-specific text) using session namespace (`workspaceRoot` or session id) and append to the system prompt.
- **Architecture / Plan / Spec** – When the request includes `namespace`, the service calls `getRagContextForPrompt` and appends context to the system prompt.
- **Voice** – RAG query uses optional `namespace` from the request (or `workspaceRoot`).

## Summary

| Goal | Action |
|------|--------|
| Development / small corpus | Use file store (default). Set `RAG_INDEX_PATH` if needed. Run `npm run rag:index` from backend. |
| Large corpus / high QPS | Set `RAG_VECTOR_STORE=pinecone`, `PINECONE_API_KEY`, `PINECONE_INDEX`. Create index in Pinecone with correct dimension. |
| Multi-tenant | Pass `namespace` (e.g. workspace id) in `/api/rag/query` and `/api/rag/reindex`. Use `RAG_NAMESPACE` or `--namespace` for the indexer script. |
| RAG context in chat | Set `RAG_CONTEXT_ENABLED=true` or send `includeRagContext: true`; optional `workspaceId` for namespace. |
