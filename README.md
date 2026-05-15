# agent-harness

agent-harness is a portable process layer for AI coding agents. It makes agents state requirements, choose a design, implement within project rules, verify the result, and deliver a clear closeout instead of jumping straight into edits.

It is for teams using tools like Codex, Claude Code, Gemini CLI, or custom coding agents inside real repositories where "just change the code" often turns into skipped context, half-finished refactors, vague verification, or messy docs.

Chinese version: [README.zh-CN.md](README.zh-CN.md)

## Why It Exists

AI coding agents are useful, but they fail in predictable ways:

- They start coding before the requirement boundary is clear.
- They make local fixes that violate project architecture.
- They call one small work package "done" while the larger migration is still open.
- They mix stable docs, transition plans, and execution checklists in the same place.
- They say something is verified without showing what was actually run.

agent-harness turns those failure modes into a small, repeatable workflow:

```text
Requirement -> Design -> Implementation -> Verification -> Delivery
```

The point is not more ceremony. The point is to make agent work reviewable, resumable, and harder to derail.

## What You Get

- **Task templates** for bug fixes, features, refactors, UI changes, and cross-module work.
- **Stage gates** that force the agent to record scope, design, implementation, verification, and delivery.
- **Autopilot rules** so gates are process records, not approval pauses.
- **Project profile** for repo-specific facts, high-risk paths, and local rules — one file, no nesting.
- **Operations docs** for long-running migrations and remediation work.
- **Lightweight process checks** to catch broken Markdown structure and known harness rule issues.

## 30-Second Example

Without a process layer:

```text
User: Fix the deployment page bug.
Agent: I changed three files. It should work now.
```

With agent-harness:

```text
Task type
Bug

Requirement gate
- Symptom: deployment page fails when the selected host is missing.
- Boundary: keep API shape and routing unchanged.
- Expected behavior: show an actionable empty state.
- Verification: targeted unit test and smoke path.

Design gate
- Fix point: normalize missing host state in the store, not inside the component.
- Risk: host selection is shared by deployment and branch flows.
- Rules: preserve Pinia state path and existing router entry.

Verification gate
- `npm run test:unit -- deploy-host-selection`: pass
- Manual smoke: deployment page empty state renders
- Not covered: real SSH connection
```

The agent still moves quickly, but reviewers can see what it believed, what it touched, and what it did not verify.

More examples:

- [Bug fix gate output](examples/bug-fix-gate-output.md)
- [Long-running remediation board](examples/long-running-remediation.md)

## Quick Start

**Recommended — git submodule:**

```bash
git submodule add https://github.com/jxiaow/agent-harness.git harness/core
mkdir -p harness/project/rules
```

Then tell your AI agent:

> Read `harness/core/ONBOARD.md` and generate the profile and rules for this repository.

The agent will scan your repo and generate `harness/project/profile.md`, project rules, and `AGENTS.md`.

**Update core:**

```bash
cd harness/core && git pull origin main
cd ../.. && git add harness/core && git commit -m "chore: update harness core"
```

**Clone a repo with submodule:**

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

## Core Model

Two directories, physically separated:

- **`harness/core/`** — generic process layer. Can be updated independently (submodule, subtree, or direct copy from upstream).
- **`harness/project/`** — project-specific config. Never overwritten by upstream updates.

## Repository Layout

```text
harness/
├── core/                    # ← upgradable independently
│   ├── AGENTS.template.md
│   ├── ONBOARD.md
│   ├── _profile.template.md
│   ├── README.md
│   ├── automation/
│   ├── docs/
│   ├── examples/
│   ├── gates/
│   ├── operations/
│   ├── rules/              # generic rules only
│   └── templates/
│
└── project/                 # ← project-specific, never overwritten by core
    ├── profile.md
    └── rules/
```

## More Documentation

- [Workflow reference](docs/workflow-reference.md)
- [Maintaining agent-harness](docs/maintaining.md)
- [Workflow reference (Chinese)](docs/workflow-reference.zh-CN.md)
- [Maintaining (Chinese)](docs/maintaining.zh-CN.md)

The workflow reference defines the closeout target types: `single-task`, `staged/ongoing`, `continuation`, and `explicit-closeout`.

## License

MIT. See [LICENSE](LICENSE).
