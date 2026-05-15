# Onboard — AI 接入指令

本文件是 AI agent 接入新项目时的唯一执行入口。读完本文件后直接执行，不需要读其他文档。

## 触发条件

当用户说"接入 harness / 生成 profile / 初始化流程"时，执行以下步骤。

---

## 步骤 1：读取仓库结构

扫描以下信息，不确定的不要猜：

- 包管理文件（package.json / Cargo.toml / go.mod / pyproject.toml / pom.xml 等）
- workspace / monorepo 配置
- 主要源码目录、测试目录、文档目录
- 构建和工具链配置
- 应用入口文件
- 路由、状态管理、中间件、认证、数据库层（如果存在）

---

## 步骤 2：生成 `harness/project/profile.md`

从仓库实际结构推断，按以下格式输出：

```markdown
# Project Profile

## Stack
（技术栈：语言、框架、构建工具）

## Repository Shape
（核心目录树，只列关键目录，不超过 15 行）

## Product Chain Map
（主要业务链路，从路由/入口/服务推断，3-8 条）

## Module Placement
（表格：新代码该放哪里，按类型列出路径）

## High-Risk Changes
（改动时需要特别小心的文件/目录，通常是入口、认证、配置、数据库层）

## Active Rules
（表格：rules/ 中的项目规则及适用场景，生成规则后填写）

## Reading Sets
（表格：按任务类型列出应读哪些规则的组合，生成规则后填写）

## Project Hard Constraints
（项目红线：不能绕过什么、不能直接操作什么、改了什么必须同步什么）
```

---

## 步骤 3：生成项目规则

在 `harness/project/rules/` 中创建项目专属规则文件。

**判断原则：** 识别这个仓库中 agent 容易犯错的风险点，每个风险点对应一个规则文件。常见风险点包括但不限于：

- 代码放错位置（分层/落点不清晰）
- 绕过已有机制（认证、去重、状态管理）
- 破坏 API 契约（路由、接口格式）
- 样式/主题不一致
- 跨模块通信方式混乱
- 编码风格漂移

**规则数量：** 根据仓库复杂度判断，简单项目 1-3 个，复杂项目 5-8 个。不要为了"完整"而生成用不上的规则。

**每个规则文件的结构：**

```markdown
# [规则名称]

## Goal
（这条规则防什么问题，1-2 句）

## Repo Facts
（目标仓库的真实目录、入口、依赖方向）

## Core Rules
（必须遵守的稳定约束）

## Design Checklist
（实现前要确认什么）

## Implementation Checklist
（改完要检查什么）

## Common Smells
（agent 容易犯的错误）
```

生成完规则后，回填 `profile.md` 的 Active Rules 和 Reading Sets。

---

## 步骤 4：生成 `AGENTS.md`

把 `harness/core/AGENTS.template.md` 的内容复制到仓库根目录作为 `AGENTS.md`，然后在 Hard Constraints 末尾追加 `profile.md` 中的 Project Hard Constraints。

---

## 步骤 5：验证

- `profile.md` 中的所有路径在仓库中真实存在
- 规则文件中的 Repo Facts 路径真实存在
- 不存在的入口写"未发现稳定入口"，不要编造

---

## 约束

- 只写仓库中已经存在的事实
- 规则只写已经稳定的模式，不写一次性临时约定
- 不要修改 `_` 前缀的通用规则文件
- 不确定时宁可少写，不要猜测
