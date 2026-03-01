# Code Mode + Context Mode for Airgapped Claude Code

On Claude Code boot inside an airgapped sandbox, automatically introspect all connected MCP servers, generate a single self-contained TypeScript SDK, and force Claude to write+run code instead of making direct tool calls. `context-mode` is introspected like any other server — its tools appear in the same generated SDK, so every script can both call tools and compress results.

No inner sandbox. No custom MCP server. No connection pooling. Bun for execution. All deps pinned.

---

## Pinned Dependencies

```
@modelcontextprotocol/sdk@1.27.1    # MCP client for introspection + tool calls
context-mode@0.9.16                   # output compression MCP server
zod@3.25.1                           # peer dep of MCP SDK
bun@1.2.5                            # runtime (verify: bun --version)
```

**⚠️ Pin everything.** Use exact versions, not ranges. The generated `tools.ts` embeds server spawn commands — if a package version changes, the server binary changes. Audit `context-mode` before first use: `npm pack context-mode@0.9.16 && tar -xzf context-mode-*.tgz && cat package/src/index.ts`.

---

## Installation

```bash
# 1. Install pinned deps in the container image (or project)
npm install --save-exact @modelcontextprotocol/sdk@1.27.1 zod@3.25.1

# 2. Verify context-mode version and audit
npm view context-mode version  # pin whatever this returns
npm pack context-mode@<VERSION> && tar -xzf context-mode-*.tgz
# READ the source before trusting it

# 3. Create codemode directory
mkdir -p .claude/codemode

# 4. Copy codegen-boot.ts and block-direct-mcp.sh into .claude/codemode/
#    (see sections below for contents)

# 5. Make hook script executable
chmod +x .claude/codemode/block-direct-mcp.sh

# 6. Add context-mode to .mcp.json (see below)

# 7. Add hooks to .claude/settings.json (see below)

# 8. Append code mode section to CLAUDE.md (see below)

# 9. Add generated files to .gitignore
echo '.claude/codemode/tools.ts' >> .gitignore
echo '.claude/codemode/.hash' >> .gitignore
```

---

## Architecture

```
┌──────────────────────────────────────────────────┐
│  Airgapped Container                             │
│                                                  │
│  Claude Code                                     │
│    ├── SessionStart hook → codegen-boot.ts       │
│    │     ├── reads .claude.json / .mcp.json      │
│    │     ├── connects to each MCP server         │
│    │     │   (including context-mode)            │
│    │     ├── calls tools/list on all of them     │
│    │     ├── generates .claude/codemode/tools.ts │
│    │     │   (wrappers for ALL tools, including  │
│    │     │    context_mode_execute, _index,       │
│    │     │    _search, _fetch_and_index)          │
│    │     └── prints context summary to stdout    │
│    │                                             │
│    ├── PreToolUse hook → block-direct-mcp.sh     │
│    │     └── blocks all mcp__* tool calls        │
│    │                                             │
│    ├── CLAUDE.md                                 │
│    │     └── workflow + patterns                  │
│    │                                             │
│    └── Bash (built-in tool)                      │
│          └── bun run /tmp/script.ts              │
│                                                  │
│  MCP Servers (all introspected into tools.ts)    │
│    ├── github                                    │
│    ├── postgres                                  │
│    ├── context-mode  ← output compression        │
│    └── ...                                       │
└──────────────────────────────────────────────────┘
```

`context-mode` is just another MCP server. `codegen-boot.ts` introspects it alongside everything else. Its tools appear in `tools.ts` as `context_mode_execute`, `context_mode_index`, `context_mode_search`, etc. Claude's scripts import both tool-calling functions and result-compression functions from the same file.

---

## Files

### 1. `.mcp.json`

```json
{
  "mcpServers": {
    "context-mode": {
      "command": "npx",
      "args": ["-y", "context-mode@0.9.16"]
    }
  }
}
```

Add your other MCP servers here too. Pin all versions.

### 2. `.claude/settings.json`

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "startup",
        "hooks": [
          {
            "type": "command",
            "command": "bun run .claude/codemode/codegen-boot.ts"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "mcp__.*",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/codemode/block-direct-mcp.sh"
          }
        ]
      }
    ]
  }
}
```

### 3. `.claude/codemode/block-direct-mcp.sh`

```bash
#!/bin/bash
INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.tool_name')
echo "Blocked direct MCP call: ${TOOL}. Write a .ts script that imports from .claude/codemode/tools.ts and run it with bun instead." >&2
exit 2
```

### 4. `.claude/codemode/codegen-boot.ts`

```typescript
#!/usr/bin/env bun

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { createHash } from 'crypto';

// --- Types ---

interface ServerConfig {
  command: string;
  args?: string[];
  env?: Record<string, string>;
}

interface ToolDef {
  server: string;
  serverConfig: ServerConfig;
  name: string;
  description: string;
  inputSchema: any;
}

// --- Config discovery ---

function loadMcpConfigs(cwd: string): Record<string, ServerConfig> {
  const configs: Record<string, ServerConfig> = {};

  const projectMcp = join(cwd, '.mcp.json');
  if (existsSync(projectMcp)) {
    const parsed = JSON.parse(readFileSync(projectMcp, 'utf-8'));
    Object.assign(configs, parsed.mcpServers ?? {});
  }

  const userConfig = join(process.env.HOME!, '.claude.json');
  if (existsSync(userConfig)) {
    const parsed = JSON.parse(readFileSync(userConfig, 'utf-8'));
    Object.assign(configs, parsed.mcpServers ?? {});
  }

  return configs;
}

// --- Schema → TS ---

function schemaTypeToTs(schema: any): string {
  if (!schema) return 'unknown';
  if (schema.enum) return schema.enum.map((e: any) => JSON.stringify(e)).join(' | ');
  switch (schema.type) {
    case 'string': return 'string';
    case 'number': case 'integer': return 'number';
    case 'boolean': return 'boolean';
    case 'array': return `${schemaTypeToTs(schema.items)}[]`;
    case 'object': return 'Record<string, unknown>';
    default: return 'unknown';
  }
}

function jsonSchemaToTsParams(schema: any): string {
  if (!schema?.properties) return 'params?: Record<string, unknown>';
  const props = Object.entries(schema.properties).map(([key, val]: [string, any]) => {
    const optional = !(schema.required ?? []).includes(key) ? '?' : '';
    const type = schemaTypeToTs(val);
    return `${key}${optional}: ${type}`;
  });
  return `params: { ${props.join('; ')} }`;
}

// --- Introspect ---

async function introspectServer(name: string, config: ServerConfig): Promise<ToolDef[]> {
  const client = new Client({ name: 'codegen-boot', version: '1.0.0' });
  const transport = new StdioClientTransport({
    command: config.command,
    args: config.args ?? [],
    env: { ...process.env, ...(config.env ?? {}) } as Record<string, string>,
  });

  await client.connect(transport);
  try {
    const { tools } = await client.listTools();
    return tools.map(t => ({
      server: name,
      serverConfig: config,
      name: t.name,
      description: t.description ?? '',
      inputSchema: t.inputSchema,
    }));
  } finally {
    await client.close();
  }
}

// --- Generate ---

function generateToolsSdk(tools: ToolDef[]): string {
  const lines: string[] = [
    '// Auto-generated by codegen-boot.ts — do not edit',
    '// Regenerated on each Claude Code session start',
    '',
    'import { Client } from "@modelcontextprotocol/sdk/client/index.js";',
    'import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";',
    '',
    'async function call(cmd: string, args: string[], env: Record<string, string>, tool: string, params: Record<string, unknown>): Promise<unknown> {',
    '  const client = new Client({ name: "codemode", version: "1.0.0" });',
    '  const transport = new StdioClientTransport({ command: cmd, args, env: { ...process.env, ...env } as Record<string, string> });',
    '  await client.connect(transport);',
    '  try {',
    '    const res = await client.callTool({ name: tool, arguments: params });',
    '    return res.content;',
    '  } finally {',
    '    await client.close();',
    '  }',
    '}',
    '',
  ];

  const byServer = new Map<string, ToolDef[]>();
  for (const t of tools) {
    if (!byServer.has(t.server)) byServer.set(t.server, []);
    byServer.get(t.server)!.push(t);
  }

  for (const [server, serverTools] of byServer) {
    lines.push(`// --- ${server} ---`);
    lines.push('');

    const config = serverTools[0].serverConfig;
    const cmdStr = JSON.stringify(config.command);
    const argsStr = JSON.stringify(config.args ?? []);
    const envStr = JSON.stringify(config.env ?? {});

    for (const t of serverTools) {
      const fnName = `${server}_${t.name}`.replace(/[^a-zA-Z0-9_]/g, '_');
      const tsParams = jsonSchemaToTsParams(t.inputSchema);
      const desc = t.description.replace(/\n/g, ' ').slice(0, 120);

      lines.push(`/** ${desc} */`);
      lines.push(`export const ${fnName} = (${tsParams}): Promise<unknown> =>`);
      lines.push(`  call(${cmdStr}, ${argsStr}, ${envStr}, ${JSON.stringify(t.name)}, params ?? {});`);
      lines.push('');
    }
  }

  return lines.join('\n');
}

// --- Main ---

async function main() {
  const input = JSON.parse(readFileSync('/dev/stdin', 'utf-8'));
  if (input.source !== 'startup') process.exit(0);

  const cwd = input.cwd ?? process.cwd();
  const outDir = join(cwd, '.claude', 'codemode');
  const outFile = join(outDir, 'tools.ts');

  const configs = loadMcpConfigs(cwd);
  const serverNames = Object.keys(configs);

  if (serverNames.length === 0) {
    console.log(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'SessionStart',
        additionalContext: 'No MCP servers configured. Code mode unavailable.',
      }
    }));
    process.exit(0);
  }

  // Cache check
  const configHash = createHash('sha256').update(JSON.stringify(configs)).digest('hex').slice(0, 12);
  const hashFile = join(outDir, '.hash');

  if (existsSync(hashFile) && existsSync(outFile)) {
    const cached = readFileSync(hashFile, 'utf-8').trim();
    if (cached === configHash) {
      const toolCount = readFileSync(outFile, 'utf-8').split('export const ').length - 1;
      printContext(serverNames, toolCount);
      process.exit(0);
    }
  }

  // Introspect all servers
  const allTools: ToolDef[] = [];
  const errors: string[] = [];

  await Promise.all(
    Object.entries(configs).map(async ([name, config]) => {
      try {
        const tools = await introspectServer(name, config);
        allTools.push(...tools);
      } catch (err: any) {
        errors.push(`${name}: ${err.message}`);
      }
    })
  );

  // Generate
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outFile, generateToolsSdk(allTools));
  writeFileSync(hashFile, configHash);

  printContext(serverNames, allTools.length, errors);
}

function printContext(servers: string[], toolCount: number, errors: string[] = []) {
  const parts = [
    `Code mode active. ${toolCount} tools from ${servers.length} servers: ${servers.join(', ')}.`,
    `SDK at .claude/codemode/tools.ts.`,
    `Write TypeScript importing from this SDK. Run with: bun run <file>.ts`,
    `Process and filter data in code before returning — only console.log what matters.`,
    `Use context_mode_index for large results, context_mode_search for retrieval.`,
  ];

  if (errors.length > 0) {
    parts.push(`Failed to introspect: ${errors.join('; ')}`);
  }

  console.log(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'SessionStart',
      additionalContext: parts.join('\n'),
    }
  }));
}

main().catch(err => {
  console.error(err.message);
  process.exit(1);
});
```

### 5. `CLAUDE.md` — append this section verbatim

````markdown
## Code Mode + Context Mode

All MCP tools — including `context-mode` — are available as typed TypeScript functions
in `.claude/codemode/tools.ts`. **Direct MCP tool calls are blocked.** Instead:

1. Read `.claude/codemode/tools.ts` to see available functions
2. Write a `.ts` script that imports what you need
3. Run it with `bun run <script>.ts`

### Rules

- **Always process data in the script.** Filter, map, aggregate — only `console.log` what's needed.
- **One script, many calls.** Chain multiple tool calls with loops/conditionals.
- **Loose types.** Return types are `Promise<unknown>`. Cast as needed.
- **Index large results.** Any tool result >1KB should be stored with `context_mode_index` before summarizing. This lets you query it later without re-fetching.

### Available tool families

Tool wrappers are named `<server>_<tool>`. Examples:

- `github_list_issues(params)` — call GitHub MCP tools
- `postgres_query(params)` — call Postgres MCP tools
- `context_mode_execute(params)` — run code in subprocess with output filtering
- `context_mode_execute_file(params)` — process file without loading into context
- `context_mode_index(params)` — store content in FTS5 knowledge base
- `context_mode_search(params)` — retrieve relevant chunks from indexed data
- `context_mode_fetch_and_index(params)` — fetch URL + index, raw content never returned

### Pattern: call + index + summarize

Every script that calls a tool returning large data should follow this pattern:

```typescript
import { github_list_issues, context_mode_index } from './.claude/codemode/tools';

const raw = await github_list_issues({ repo: "myorg/api", state: "all" });

// Index full result — queryable later, never enters context
await context_mode_index({ content: JSON.stringify(raw), source: "issues-all" });

// Only log summary
const issues = raw as any[];
console.log(JSON.stringify({
  total: issues.length,
  open: issues.filter((i: any) => i.state === 'open').length,
  oldest: issues.slice(-3).map((i: any) => i.title)
}));
```

### Pattern: search previously indexed data

```typescript
import { context_mode_search } from './.claude/codemode/tools';

const hits = await context_mode_search({ query: "auth middleware bug" });
console.log(JSON.stringify(hits));
```

### Pattern: compress shell output

```typescript
import { context_mode_execute } from './.claude/codemode/tools';

const result = await context_mode_execute({
  language: "shell",
  code: "cat access.log",
  intent: "5xx errors in the last hour"
});
console.log(JSON.stringify(result));
```

### Pattern: index docs for repeated reference

```typescript
import { context_mode_fetch_and_index, context_mode_search } from './.claude/codemode/tools';

await context_mode_fetch_and_index({ url: "https://docs.example.com/api" });
// Later:
const hits = await context_mode_search({ query: "rate limiting" });
console.log(JSON.stringify(hits));
```
````

---

## File Tree

```
.claude/
├── settings.json              # hooks config
├── codemode/
│   ├── codegen-boot.ts        # SessionStart script (checked in)
│   ├── block-direct-mcp.sh    # PreToolUse script (checked in)
│   ├── tools.ts               # generated SDK (gitignored)
│   └── .hash                  # config cache hash (gitignored)
.mcp.json                      # MCP server configs with pinned versions
.gitignore                     # includes tools.ts and .hash
CLAUDE.md                      # includes code mode + context mode section
package.json                   # pinned deps
```

---

## End-to-End Flow

```
1.  Claude Code starts
2.  SessionStart hook fires → bun run codegen-boot.ts
3.  codegen-boot.ts reads .mcp.json + ~/.claude.json
4.  Connects to each server (including context-mode), calls tools/list
5.  Generates .claude/codemode/tools.ts with typed wrappers for ALL tools
6.  Prints context summary → Claude sees "Code mode active. 52 tools from 6 servers."

7.  Claude gets a task: "analyze all GitHub issues for auth bugs"
8.  Claude tries mcp__github__list_issues → PreToolUse blocks it
9.  Claude writes /tmp/analyze-issues.ts:

      import { github_list_issues, context_mode_index } from './.claude/codemode/tools';
      const raw = await github_list_issues({ repo: "myorg/api", state: "all" });
      await context_mode_index({ content: JSON.stringify(raw), source: "issues" });
      const issues = raw as any[];
      console.log(JSON.stringify({ total: issues.length, open: issues.filter(i => i.state === 'open').length }));

10. Claude runs: bun run /tmp/analyze-issues.ts
11. Script calls GitHub MCP → gets raw issues
12. Script calls context-mode MCP → indexes full result in FTS5
13. Script logs compressed summary → only summary enters context
14. Claude reports: "Found 142 issues, 89 open."

15. Claude writes /tmp/search-auth.ts:

      import { context_mode_search } from './.claude/codemode/tools';
      console.log(JSON.stringify(await context_mode_search({ query: "authentication" })));

16. Runs it → gets relevant chunks from FTS5 → never re-fetches from GitHub
```

---

## Implementation Order

1. Pin and audit all dependency versions
2. Install deps in container image
3. Add `context-mode` to `.mcp.json` with pinned version
4. Write `codegen-boot.ts` — test standalone: `echo '{"source":"startup","cwd":"."}' | bun run .claude/codemode/codegen-boot.ts`
5. Write `block-direct-mcp.sh` — `chmod +x`
6. Add hooks to `.claude/settings.json`
7. Append code mode section to `CLAUDE.md`
8. Boot Claude Code, test with 2-3 MCP servers
9. Iterate on CLAUDE.md based on actual behavior

---

## Security Notes

- **Pin all versions.** `npx -y context-mode@0.9.16` not `npx -y context-mode`. The generated `tools.ts` embeds these commands.
- **Audit before first use.** `npm pack` + read source for every MCP server and dependency.
- **The generated `tools.ts` contains server spawn commands.** Treat it as sensitive. It's gitignored but lives on disk in the container.
- **`codegen-boot.ts` inherits env vars** to pass to MCP servers. If your container has secrets in env, they'll be embedded in `tools.ts` as JSON. Consider using config files instead of env vars for secrets, or strip sensitive env vars from the generated output.
- **PreToolUse hook blocks ALL `mcp__*` calls.** If Claude somehow bypasses this (e.g., via a subagent), the MCP servers are still accessible. The hook is defense-in-depth, not a security boundary.

---

## Later If Needed

- **Search tool**: if tool count >50 and Claude struggles to find functions by reading the file, add fuzzy search
- **Connection reuse**: optional keep-alive for tight loops (unlikely to need)
- **HTTP/SSE transport**: currently stdio only, extend when needed
- **Output schema inference**: only if `unknown` return types cause real friction
