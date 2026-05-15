# AgentHarness

AgentHarness is a portable process layer for AI coding agents. It makes agents state requirements, choose a design, implement within project rules, verify the result, and deliver a clear closeout instead of jumping straight into edits.

It is for teams using tools like Codex, Claude Code, Gemini CLI, or custom coding agents inside real repositories where "just change the code" often turns into skipped context, half-finished refactors, vague verification, or messy docs.

中文说明：[README.zh-CN.md](README.zh-CN.md)

## Why It Exists

AI coding agents are useful, but they fail in predictable ways:

- They start coding before the requirement boundary is clear.
- They make local fixes that violate project architecture.
- They call one small work package "done" while the larger migration is still open.
- They mix stable docs, transition plans, and execution checklists in the same place.
- They say something is verified without showing what was actually run.

AgentHarness turns those failure modes into a small, repeatable workflow:

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

With AgentHarness:

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

**让 AI 自动接入（推荐）：**

把 `harness/core/` 复制到目标仓库后，给 AI 一句话：

> 读 `harness/core/ONBOARD.md`，根据这个仓库生成 profile 和规则。

AI 会自动扫描仓库结构，生成 `profile.md`、项目规则和 `AGENTS.md`。

**手动接入：**

1. 导出干净副本：`node harness/core/export-open-source.js --target <dir>`
2. 让 AI 执行 `ONBOARD.md`
3. 或者手动参考 `_profile.template.md` 填写

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
├── core/                    # ← 可独立升级
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
└── project/                 # ← 项目专属，不随 core 迁移
    ├── profile.md
    └── rules/
```

## More Documentation

- [Workflow reference](docs/workflow-reference.md)
- [Maintaining AgentHarness](docs/maintaining.md)
- [中文工作流参考](docs/workflow-reference.zh-CN.md)
- [中文维护说明](docs/maintaining.zh-CN.md)

The workflow reference defines the closeout target types: `single-task`, `staged/ongoing`, `continuation`, and `explicit-closeout`.

## License

MIT. See [LICENSE](LICENSE).
