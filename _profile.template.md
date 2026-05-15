# Project Profile

本文件是项目适配的唯一入口。按下面的结构填写你的项目信息。

## Stack

<!-- 列出项目的技术栈 -->
- **Type**: (Monorepo / Single app / Library / CLI / ...)
- **Frontend**: (React / Vue / Svelte / None / ...)
- **Backend**: (Express / FastAPI / Go / None / ...)
- **Build**: (Vite / Webpack / Cargo / ...)

## Repository Shape

<!-- 画出核心目录结构，只列关键目录 -->
```
src/
├── ...
└── ...
```

## Product Chain Map

<!-- 列出产品的主要业务链路，帮助 agent 判断任务归属 -->
- 链路 A（...）
- 链路 B（...）

## Module Placement

<!-- 告诉 agent 新代码该放哪里 -->
| 类型 | 路径 |
| --- | --- |
| ... | `src/...` |

## High-Risk Changes

<!-- 列出改动时需要特别小心的文件/目录 -->
- `path/to/critical-file`
- `path/to/another`

## Active Rules

<!-- 列出 rules/ 中的项目专属规则及其适用场景 -->
| 规则 | 适用场景 |
| --- | --- |
| `rule-name` | 什么时候读 |

## Reading Sets

<!-- 按任务类型列出应该读哪些规则的组合 -->
| 任务类型 | 读取规则 |
| --- | --- |
| 新功能 | `rule-a` + `rule-b` |
| Bug 修复 | `rule-c` + `rule-d` |

## Project Hard Constraints

<!-- 列出项目的红线 — agent 绝对不能做的事 -->
- 不要 ...
- 不要 ...
