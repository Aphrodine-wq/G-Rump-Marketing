# MCP Setup – Connect External MCP Servers

G-Rump can consume tools from external MCP (Model Context Protocol) servers. When you configure MCP servers in Settings, their tools are exposed to the AI during chat and Free Agent sessions.

## Prerequisites

- Pro or Team tier (MCP consumption is a premium feature)
- MCP servers that support stdio transport (e.g. cursor-ide-browser, filesystem MCP)

## Configuration

### 1. Add MCP servers in Settings

In **Settings > MCP**, add servers with:

- **Name**: Display name (e.g. "Browser", "Filesystem")
- **Command**: Executable to spawn (e.g. `node`, `npx`)
- **Args**: Arguments (e.g. `["path/to/mcp-server.js"]` or `["-y", "@modelcontextprotocol/server-filesystem", "/path"]`)
- **Env**: Optional environment variables (e.g. `{"API_KEY": "..."}`)

Example for a filesystem MCP server:

```json
{
  "id": "fs-1",
  "name": "Filesystem",
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-filesystem", "/workspace"],
  "enabled": true
}
```

### 2. Tool registration

When you start a chat or Free Agent session, the backend:

1. Loads your MCP server configs from settings
2. Spawns each server process
3. Calls `tools/list` via JSON-RPC over stdio
4. Registers the returned tools for the session
5. Exposes them to the AI

### 3. Tool execution

When the AI requests an MCP tool:

1. The backend spawns the corresponding MCP server
2. Calls `tools/call` with the tool name and arguments
3. Returns the result to the AI
4. Terminates the server process

## Supported transports

Currently only **stdio** transport is supported (command + args). Streamable HTTP and other transports may be added in a future release.

## Security

- MCP servers run as child processes with the environment you specify
- Only add MCP servers you trust; they can access files and execute code
- Use the External APIs allowlist (Free Agent) to control outbound HTTP

## Troubleshooting

- **"MCP tools/list failed"**: Ensure the command and args are correct; the server must respond to `tools/list` within 10 seconds
- **"MCP tool X not found"**: The tool may be from a server that wasn't loaded; check that the server is enabled and returns tools
- **Tool execution timeout**: MCP tool calls have a 10-second timeout; long-running tools may fail
