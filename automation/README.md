# Automation

This directory contains process checks, entry checks, and rule-to-automation mappings.

## Current Files

| File | Purpose |
| --- | --- |
| `check-process.js` | Harness core process check (Markdown structure, gate conventions) |
| `check-entry.js` | Project entry check (route mounting, view registration, asyncHandler) |
| `check-harness.js` | Combined check (runs process + entry sequentially) |
| `rule-to-check-map.md` | Rule-to-automation mapping reference |

## Quick Use

```bash
# Daily wrap-up — only check current changes
node harness/core/automation/check-harness.js --changed --summary --max-issues 3

# Pre-commit — staged files check
node harness/core/automation/check-harness.js --staged --summary --max-issues 3

# Specific files/directories
node harness/core/automation/check-process.js --summary --max-issues 3 <path>

# Full check
node harness/core/automation/check-process.js
```

## Cost Control

- Default checks current changeset; does not scan historical backlog
- Checks display first 5 issues by default; adjust with `--max-issues`
- On bulk failures, use `--summary` to see rule distribution
- Detailed report written to `.tmp/harness-check-report.json`
- Full lint/test/build only for stage closeout or high-risk changes
