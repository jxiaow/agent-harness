# agent-harness

agent-harness 是一个给 AI coding agent 使用的可移植流程层。它让 agent 在直接动手改代码之前，先说明需求、选择设计方案、在项目规则内实现、验证结果，并输出清晰的交付收口。

它适合在真实仓库里使用 Codex、Claude Code、Gemini CLI 或自定义 coding agent 的团队。在这些仓库里，一句“直接改代码”经常会变成跳过上下文、重构半途而止、验证含糊，或文档变乱。

English README: [README.md](README.md)

## 为什么需要它

AI coding agent 很有用，但它们会以可预测的方式失败：

- 需求边界还没清楚就开始写代码。
- 做局部修复时违反项目架构。
- 把一个小工作包说成“已完成”，但更大的迁移仍然没结束。
- 把稳定文档、过渡计划和执行 checklist 混在同一个地方。
- 没说明实际运行了什么验证，就说某件事已经验证过。

agent-harness 把这些失败模式收敛成一个小而可重复的工作流：

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

使用 agent-harness 时：

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

**推荐方式 — git submodule：**

```bash
git submodule add https://github.com/jxiaow/agent-harness.git harness/core
mkdir -p harness/project/rules
```

然后给 AI 一句话：

> 读 `harness/core/ONBOARD.md`，根据这个仓库生成 profile 和规则。

AI 会自动生成 `harness/project/profile.md`、项目规则和 `AGENTS.md`。

**升级 core：**

```bash
cd harness/core && git pull origin main
cd ../.. && git add harness/core && git commit -m "chore: update harness core"
```

**克隆含 submodule 的仓库：**

```bash
git clone --recurse-submodules <your-repo>
# 或已有克隆：
git submodule update --init
```

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

两个目录，物理隔离：

- **`harness/core/`** — 通用流程层，可独立升级（submodule / subtree / 直接覆盖）
- **`harness/project/`** — 项目专属配置，不随 core 更新被覆盖

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
- [Maintaining agent-harness](docs/maintaining.md)
- [中文工作流参考](docs/workflow-reference.zh-CN.md)
- [中文维护说明](docs/maintaining.zh-CN.md)

## License

MIT. See [LICENSE](LICENSE).
