# Project Profile

This file is the single entry point for project adaptation. Fill in your project information following the structure below.

## Stack

<!-- List the project's tech stack -->
- **Type**: (Monorepo / Single app / Library / CLI / ...)
- **Frontend**: (React / Vue / Svelte / None / ...)
- **Backend**: (Express / FastAPI / Go / None / ...)
- **Build**: (Vite / Webpack / Cargo / ...)

## Repository Shape

<!-- Draw the core directory structure, list only key directories -->
```
src/
├── ...
└── ...
```

## Product Chain Map

<!-- List the product's main business chains to help the agent determine task ownership -->
- Chain A (...)
- Chain B (...)

## Module Placement

<!-- Tell the agent where new code should go -->
| Type | Path |
| --- | --- |
| ... | `src/...` |

## High-Risk Changes

<!-- List files/directories that require extra caution when modified -->
- `path/to/critical-file`
- `path/to/another`

## Active Rules

<!-- List project-specific rules in rules/ and their applicable scenarios -->
| Rule | Applicable Scenario |
| --- | --- |
| `rule-name` | When to read |

## Reading Sets

<!-- List which rule combinations to read by task type -->
| Task Type | Rules to Read |
| --- | --- |
| New feature | `rule-a` + `rule-b` |
| Bug fix | `rule-c` + `rule-d` |

## Project Hard Constraints

<!-- List project red lines — things the agent must never do -->
- Do not ...
- Do not ...
