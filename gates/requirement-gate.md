# Requirement Gate

## Goal

Clarify what this task is actually solving before entering design or implementation.

## Minimal Fields

Use multi-line short lists by default, up to 6 items:

- Task type
- Target problem
- Success criteria
- Impact scope
- Out of scope
- Special constraints

## Only Add When Relevant

- Bug: symptom, expected behavior, reproduction steps, environment
- New feature: target user, entry point, is it new/replacement/enhancement
- Refactor: does external behavior remain unchanged, what is the main pain point
- Other: determine which template is closest

## Recommended Output

```text
Requirement gate
- Task type: ...
- Target problem: ...
- Success criteria: ...
- Impact scope: ...
- Out of scope: ...
- Special constraints: ...
```

Default requirements:

- Simple tasks may reduce field count, but do not cram multiple fields into one line with semicolons
- If declaring task type simultaneously, task type must be on its own line, not crammed with the gate heading
- When output alongside other gates, separate with blank lines before and after
- Complex tasks prefer 4-6 line short lists
- Do not omit critical boundaries for brevity
- Only write boundaries needed for the current task
- Do not restate template instructions or common knowledge

## Good / Bad

Good:

```text
Requirement gate
- Task type: UI adjustment
- Target problem: deployment status label wraps and squeezes on narrow screens
- Success criteria: label readable, does not obscure buttons
- Impact scope: DeploymentStatus component styles
- Out of scope: do not change status calculation logic
```

Bad:

```text
Requirement gate
- Adjust some styles, should be simple, just change CSS.
```
