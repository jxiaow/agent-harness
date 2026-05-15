# Implementation Gate

## Goal

Confirm the implementation has reached a "verifiable state", not just half-done.

## Minimal Fields

Use multi-line short lists by default, up to 4 items:

- Core changes
- Target files/modules
- Key rules covered
- Incomplete items

## Only Add When Relevant

- High-risk entry: has the change scope been narrowed, does it carry unrelated logic
- Cross-module: does it introduce reverse dependencies, does it bypass existing communication chains
- UI: are key states still in the correct container
- Public interface: is the entry point wired up, are error paths complete
- Style system: are design tokens/variables used, are hardcoded reusable style values avoided

## Recommended Output

```text
Implementation gate
- Core changes: ...
- Target: ...
- Rules covered: ...
- Incomplete: ...
```

Default requirements:

- Simple tasks may reduce field count, but do not cram multiple fields into one line with semicolons
- When output alongside other gates, separate with blank lines before and after
- Complex tasks prefer 3-4 line short lists
- Do not repeat content already stated in Requirement / Design gates
