# Delivery Gate

## Goal

Only output consumable delivery at true closeout; do not format intermediate progress as a final report.

## Default

- In progress: update backlog / verification matrix / checklist
- Stage closeout: output `Verification + Delivery`
- When long-term documentation is needed: also write `docs/development/changes/`

## Final Closeout Conditions

Before `final closeout`, first determine the current target type:

- `single-task`: one-off task; can close out when the user's requested result and necessary verification are complete
- `staged/ongoing`: long-running, multi-stage, or continuous task; can only close out when the current stage checklist has no actionable remaining items, or a real blocker exists
- `continuation`: user only says "continue / start / go ahead / proceed as planned"; inherit the previous active stage goal, continue to the next item, do not treat a work package completion as final completion
- `explicit-closeout`: user explicitly says "summarize / close out / stop here / that's enough"; close out based on current verified state

Only output `final closeout` when ALL of the following are met:

1. Target type determination is complete, and it is not a `continuation` that should keep going
2. The current user goal is complete, not just one work package
3. There is no actionable next step, or a real blocker exists
4. If using an execution board or checklist, it has been read and the highest-priority item in the current stage has been advanced with no next actionable step

Otherwise, only output `working update` and continue execution.

If there are still actionable next items, prefer continuing execution over outputting a Delivery gate.

## Executable Risk Is Not Closeout Risk

Between `Verification gate` and `Delivery gate`, all unverified items and risks must be classified:

- `actionable`: can still be fixed, verified, tested, or narrowed within the current repo, permissions, and information
- `blocked`: continuing requires user authorization, external environment, missing critical input, or would damage existing changes
- `accepted residual`: goal is complete, but there remain real runtime environment risks that cannot be proven or eliminated within the current task

As long as `actionable` items exist, the current stage cannot enter `final closeout`. They must be routed back to `Implementation gate` or `Verification gate` for continued processing.

The following are NOT "residual risk" but actionable items that must continue to be processed:

- Test failures not yet triaged or fixed
- Test contracts not yet synced with current requirements or UI
- Verification commands that can clearly still be run
- Known code issues with clear fix surface that need no new authorization
- Known runtime risks that can be further narrowed through code, tests, timeouts, cancellation, retries, or diagnostic logging

When such items exist, `final closeout` is forbidden. Continue to the next step, or explain the real blocker when permissions, environment, or critical input is missing.

Before closing out with test failures, triage must follow `../rules/test-failure-triage.md`; do not package "tests still need fixing" as risk and stop.

## Evidence Anchors

`final closeout` should by default include:

1. Result
2. Most recent key verification command and result
3. Unverified items and real residual risk

When there are no unverified items or real risks, state so in one sentence; do not expand into a risk list or write generic "next steps" suggestions.

## Change Log Retention

Default to maintaining todo/checklist. Only write `docs/development/changes/` when:

- A completed stage of process refactoring or architecture adjustment
- A completed high-risk entry modification that needs long-term context
- A major bug fix requiring preserved decision context
- User explicitly requests a change record

Do not write by default for:

- Intermediate work package progress
- Routine steps already recorded in checklist
- Pure style, naming, comment, or test additions

## Checklist Template

```text
- [x] Completed item
- [ ] Todo item
- [-] Blocked item: reason
```

## Recommended Output

```text
Result: ...
Verified: ...
Unverified/Risk: ...
```

Can also use short paragraphs or short lists, as long as result, verification, and risk are clearly distinguished.

Default requirements:

- Simple tasks prefer 1-2 short paragraphs, no forced sections
- Formatted output is allowed; do not require compression into one line or a single tag line
- Do not repeat file listings
- Intermediate stages do not need the full skeleton
- Do not package "no risk / can continue" into verbose closeout; prefer continuing execution
