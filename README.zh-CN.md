# AgentHarness

AgentHarness 是一个给 AI coding agent 使用的可移植流程层。它让 agent 在直接动手改代码之前，先说明需求、选择设计方案、在项目规则内实现、验证结果，并输出清晰的交付收口。

它适合在真实仓库里使用 Codex、Claude Code、Gemini CLI 或自定义 coding agent 的团队。在这些仓库里，一句“直接改代码”经常会变成跳过上下文、重构半途而止、验证含糊，或文档变乱。

English README: [README.md](README.md)

## 为什么需要它

AI coding agent 很有用，但它们会以可预测的方式失败：

- 需求边界还没清楚就开始写代码。
- 做局部修复时违反项目架构。
- 把一个小工作包说成“已完成”，但更大的迁移仍然没结束。
- 把稳定文档、过渡计划和执行 checklist 混在同一个地方。
- 没说明实际运行了什么验证，就说某件事已经验证过。

AgentHarness 把这些失败模式收敛成一个小而可重复的工作流：

```text
Requirement -> Design -> Implementation -> Verification -> Delivery
```

重点不是增加仪式感，而是让 agent 的工作可审阅、可恢复，并且更不容易跑偏。

## 你会得到什么

- **任务模板**：覆盖 bug 修复、新功能、重构、UI 调整和跨模块改动。
- **阶段 gate**：强制 agent 记录范围、设计、实现、验证和交付。
- **Autopilot 规则**：gate 是过程记录，不是审批暂停点。
- **项目适配层**：记录仓库事实、高风险路径和本地规则。
- **运行态文档**：承接长周期迁移和整改工作。
- **轻量流程检查**：发现 Markdown 结构问题和已知 harness 规则问题。

## 30 秒示例

没有流程层时：

```text
User: Fix the deployment page bug.
Agent: I changed three files. It should work now.
```

使用 AgentHarness 时：

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

agent 仍然可以快速推进，但 reviewer 能看到它理解了什么、改了什么、以及什么没有验证。

更多示例：

- [Bug fix gate output](examples/bug-fix-gate-output.md)
- [Long-running remediation board](examples/long-running-remediation.md)

## 快速开始

**让 AI 自动接入（推荐）：**

把 `harness/core/` 复制到目标仓库后，给 AI 一句话：

> 读 `harness/core/ONBOARD.md`，根据这个仓库生成 profile 和规则。

AI 会自动扫描仓库结构，生成 `profile.md`、项目规则和 `AGENTS.md`。

**手动接入：**

1. 导出干净副本：`node harness/core/export-open-source.js --target <dir>`
2. 让 AI 执行 `ONBOARD.md`
3. 或者手动参考 `_profile.template.md` 填写

## 可选 npm Scripts

```json
{
  "scripts": {
    "process:check": "node harness/core/automation/check-process.js",
    "harness:check": "node harness/core/automation/check-harness.js",
    "harness:ops:init": "node harness/core/operations/create-operation-docs.js"
  }
}
```

## 核心模型

所有规则放在一个扁平目录（`rules/`）中。约定：

- **`_` 前缀** = 通用/可移植规则（随 harness 迁移到任何仓库）
- **无前缀** = 项目专属规则（绑定当前仓库）

项目事实（结构、链路、高风险路径）放在 `profile.md` — 一个文件，无嵌套。

## 仓库结构

```text
harness/core/
├── AGENTS.template.md   # 复制到仓库根目录作为 AGENTS.md
├── profile.md           # 项目配置（结构、规则、约束）
├── README.md
├── automation/          # 流程检查 + 入口检查
├── docs/                # Harness 文档
├── examples/            # Gate 输出示例
├── gates/               # 阶段 gate 定义
├── operations/          # 长周期运行态模板
├── rules/               # 所有规则拍平（_前缀 = 通用）
└── templates/           # 任务类型模板
```

## 更多文档

- [Workflow reference](docs/workflow-reference.md)
- [Maintaining AgentHarness](docs/maintaining.md)
- [中文工作流参考](docs/workflow-reference.zh-CN.md)
- [中文维护说明](docs/maintaining.zh-CN.md)

## License

MIT. See [LICENSE](LICENSE).
