# Automation

本目录承载流程检查、入口检查和规则到自动化的映射。

## Current Files

| 文件 | 用途 |
| --- | --- |
| `check-process.js` | harness core 流程检查（Markdown 结构、gate 规范） |
| `check-entry.js` | 项目入口检查（路由挂载、视图注册、asyncHandler） |
| `check-harness.js` | 组合检查（依次运行 process + entry） |
| `rule-to-check-map.md` | 规则到自动化的映射参考 |

## Quick Use

```bash
# 日常收口 — 只检查当前变更
node harness/core/automation/check-harness.js --changed --summary --max-issues 3

# 提交前 — 暂存区检查
node harness/core/automation/check-harness.js --staged --summary --max-issues 3

# 指定文件/目录
node harness/core/automation/check-process.js --summary --max-issues 3 <path>

# 全量检查
node harness/core/automation/check-process.js
```

## Cost Control

- 默认检查当前变更集，不全仓扫描历史存量
- 检查默认只展示前 5 个问题，用 `--max-issues` 调整
- 批量失败时用 `--summary` 看规则分布
- 详细报告写到 `.tmp/harness-check-report.json`
- 全量 lint/test/build 只用于阶段收口或高风险改动
