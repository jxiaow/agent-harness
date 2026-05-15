# AGENTS.md

本文件是 AI/agent 开发流程的总入口。

- 流程层：`harness/core/`（通用，可独立升级）
- 项目层：`harness/project/`（当前项目配置）

## 标准流程

```
Requirement → Design → Implementation → Verification → Delivery
```

1. 声明任务类型
2. 输出 Requirement gate
3. 输出 Design gate
4. 读取相关规则（`harness/core/rules/` + `harness/project/rules/`）
5. 实现 → Implementation gate
6. 验证 → Verification gate
7. 交付 → Delivery gate

## 自动触发

| 关键词 | 模板 |
| --- | --- |
| 修复 / bug / 错误 / 问题 | `bug-fix` |
| 重构 / 优化 / 整理 | `refactor` |
| 新增 / 添加 / 实现 | `new-feature` |
| 调整 / 修改 / 改样式 | `ui-adjustment` |
| 跨模块 / 影响多个 | `cross-module-change` |
| 整体结构 / 目录调整 / workspace / 迁移 | `cross-module-change` + 长周期处理 |

识别到关键词自动进入，不需要用户提醒。

## Autopilot

- gate 是过程记录，不是确认点；无阻塞时连续执行
- 只在需要用户授权、会误伤已有改动、缺关键输入时暂停
- UI 重设计 / 大幅视觉改版：Design gate 后等用户确认
- 长周期任务：先建 todo/checklist，按顺序推进
- 禁止"如果你同意 / 要不要继续"式停顿

## 精简输出

- 起手 1 句，只说目标
- gate 用多行短列表
- 执行中默认不报，关键节点 1 句同步
- final closeout：结果 → 验证 → 未验证 → 风险

## Hard Constraints

- 无论改动多小，必须过 gate
- 禁止跳过流程直接写实现
- 禁止把中间进度写成最终交付格式
- 默认自动推进，不用提问替代可自行完成的动作
- 不要默认执行编译/构建或启动 dev server（除非验证必须）
- 测试失败时先执行 `harness/core/rules/test-failure-triage.md`

## 项目配置

见 `harness/project/profile.md`

## Navigation

| 内容 | 路径 |
| --- | --- |
| 项目配置 | `harness/project/profile.md` |
| 项目规则 | `harness/project/rules/` |
| 任务模板 | `harness/core/templates/` |
| 阶段 gate | `harness/core/gates/` |
| 通用规则 | `harness/core/rules/` |
| 自动化 | `harness/core/automation/` |
| 运行态文档模板 | `harness/core/operations/` |

## 接入新项目

把 `harness/core/` 复制到目标仓库，创建 `harness/project/` 目录，然后给 AI 一句话：

> 读 `harness/core/ONBOARD.md`，根据这个仓库生成 profile 和规则。

AI 会自动完成：生成 `harness/project/profile.md`、项目规则、`AGENTS.md`。
