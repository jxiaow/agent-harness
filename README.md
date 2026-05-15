# agent-harness

A portable process layer for AI coding agents. It makes agents state requirements, choose a design, implement within project rules, verify the result, and deliver a clear closeout — instead of jumping straight into edits.

For teams using Codex, Claude Code, Kiro, Gemini CLI, Cursor, or custom agents in real repositories.

Chinese version: [README.zh-CN.md](README.zh-CN.md)

## The Problem

AI coding agents fail in predictable ways:

- Start coding before the requirement boundary is clear
- Make local fixes that violate project architecture
- Call one work package "done" while the larger migration is still open
- Say something is verified without showing what was actually run

agent-harness turns those failure modes into a repeatable workflow:

```
Requirement → Design → Implementation → Verification → Delivery
```

## Quick Start

### 1. Add submodule

```bash
git submodule add https://github.com/jxiaow/agent-harness.git harness/core
mkdir -p harness/project/rules
```

### 2. Tell the AI

> Read `harness/core/ONBOARD.md` and generate the profile and rules for this repository.

The AI will:

1. Scan your repo structure (package.json, directories, entry points, routes, etc.)
2. Generate `harness/project/profile.md` — project facts, module placement, high-risk paths, red lines
3. Generate `harness/project/rules/*.md` — project-specific rules based on identified risk points
4. Generate `AGENTS.md` at repo root — workflow entry point with your project's hard constraints

### 3. Done

Your repo now has a complete agent workflow. Every AI agent that reads `AGENTS.md` will follow the gate process.

## How It Works

```
harness/
├── core/                    ← submodule (generic, independently upgradable)
│   ├── AGENTS.template.md   # Template for AGENTS.md
│   ├── ONBOARD.md           # AI reads this to set up a new project
│   ├── gates/               # Stage gate definitions
│   ├── templates/           # Task type templates (bug-fix, new-feature, etc.)
│   ├── rules/               # Generic rules (token-efficiency, test-failure-triage)
│   ├── automation/          # Process checks
│   └── operations/          # Long-running initiative templates
│
└── project/                 ← project-specific (never overwritten by core updates)
    ├── profile.md           # Project facts, chains, placement, constraints
    └── rules/               # Project-specific rules
```

**core/** is generic — it defines the workflow, gates, and templates. It knows nothing about your project.

**project/** is specific — it contains your project's architecture facts, risk points, and red lines. AI generates this for you.

## Workflow

Every task follows:

```
1. Declare task type (bug / feature / refactor / UI / cross-module)
2. Requirement gate — what are we solving, what's in/out of scope
3. Design gate — where to change, what's the risk, how to verify
4. Implementation — write code
5. Verification gate — what was verified, what wasn't, residual risk
6. Delivery gate — closeout with evidence
```

Gates are process records, not approval pauses. The agent outputs them and keeps going.

## Auto Trigger

The agent automatically enters the workflow when it detects keywords:

| Keywords | Template |
| --- | --- |
| fix / bug / error | `bug-fix` |
| refactor / optimize / clean up | `refactor` |
| add / create / implement | `new-feature` |
| adjust / restyle | `ui-adjustment` |
| cross-module / affects multiple | `cross-module-change` |

## Update Core

```bash
cd harness/core && git pull origin main
cd ../.. && git add harness/core && git commit -m "chore: update harness core"
```

## Clone a Repo with Submodule

```bash
git clone --recurse-submodules <your-repo>
# or for existing clones:
git submodule update --init
```

## Optional npm Scripts

```json
{
  "scripts": {
    "process:check": "node harness/core/automation/check-process.js",
    "harness:check": "node harness/core/automation/check-harness.js",
    "harness:ops:init": "node harness/core/operations/create-operation-docs.js"
  }
}
```

## More Documentation

- [Workflow reference](docs/workflow-reference.md)
- [Maintaining agent-harness](docs/maintaining.md)
- [Workflow reference (Chinese)](docs/workflow-reference.zh-CN.md)
- [Maintaining (Chinese)](docs/maintaining.zh-CN.md)

## License

MIT. See [LICENSE](LICENSE).
