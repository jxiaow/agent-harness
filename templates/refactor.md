# Refactor Template

## Goal

Improve boundaries, readability, or reuse without changing existing external behavior.

## Minimal Analysis

Only add these 5 items by default:

- Refactoring goal
- Is behavior preserved
- Boundary
- Core focus points
- Verification method

## Only Add When Relevant

- Touches high-risk entry: explain why this specific location must be changed
- Involves cross-module: explain dependency direction and communication boundaries
- Needs phasing: explain which layer first, which layer next
- Long-running / multi-stage: first list stage-level todo/checklist, execution order, and current first stage
- Just moving files: explain why this still provides structural benefit

## Recommended Output

```text
Refactor gate
- Goal: ...
- Boundary: ...
- Focus: ...
- Verification: ...
```
