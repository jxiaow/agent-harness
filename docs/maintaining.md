# Maintaining agent-harness

This document is for maintainers of the harness itself. It does not need to be read by most users who only copy the harness into a repository.

## Responsibility Split

Keep rules in the narrowest stable place:

- `AGENTS.md`: repo-level hard constraints, trigger rules, red lines, and navigation.
- `README.md`: high-level project introduction and quick start.
- `docs/workflow-reference.md`: general execution model, task sizing, and long-running workflow.
- `templates/`: minimal analysis fields for each task type.
- `gates/`: stage closeout fields, examples, and anti-patterns.
- `rules/`: all rules in one flat directory (`_` prefix = generic, no prefix = project-specific).
- `automation/`: process checks and entry checks.
- `profile.md`: repository facts, business chains, high-risk paths.

## Maintenance Checklist

When maintaining the harness, check that:

- template triggers, gate order, and workflow defaults agree
- repository-specific facts stay in `profile.md` or project-specific rules (no `_` prefix)
- automation mapping tables render correctly
- regex values containing `|` are escaped in Markdown tables
- new rules have either a human judgment point or a candidate automated check

## Export Checklist

Before publishing an open-source export:

1. Run targeted process checks.
2. Run harness tests.
3. Export with `node harness/core/export-open-source.js --target <dir>`.
4. Confirm project-local adapter content is not included.
5. Confirm examples and localized README files are included.
