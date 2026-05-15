# Design Gate

## Goal

Determine the change point, boundaries, and risks before writing implementation.

## Minimal Fields

Use multi-line short lists by default, up to 6 items:

- Change point
- Approach choice
- Rationale
- Change boundary
- Main risk
- Verification approach

## Only Add When Relevant

- High-risk entry: why this specific location must be changed, rather than something more local
- Cross-module: how the communication chain works (API / IPC / Store)
- UI: whether it involves themes, CSS variables, existing component patterns
- Bug: why the fix targets the root cause

## Recommended Output

```text
Design gate
- Change point: ...
- Approach: ...
- Rationale: ...
- Boundary: ...
- Main risk: ...
- Verification approach: ...
```

Default requirements:

- Simple tasks may reduce field count, but do not cram multiple fields into one line with semicolons
- When output alongside other gates, separate with blank lines before and after
- Complex tasks prefer 4-6 line short lists
- Do not omit critical risks or verification approach for brevity
- Only keep decisions and boundaries
- Do not write implementation play-by-play

## Good / Bad

Good:

```text
Design gate
- Change point: DeploymentStatus scoped CSS
- Approach: reuse existing CSS variables, adjust flex-wrap and min-width
- Boundary: do not change component props, store, or state enums
- Main risk: long text may still squeeze the action area
- Verification approach: check narrow screen, long project names, and multi-state combinations
```

Bad:

```text
Design gate
- Try changing it first, adjust later if needed.
```
