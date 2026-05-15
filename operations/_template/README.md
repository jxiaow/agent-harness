# Operations Template

This directory is the operations document template for long-running / multi-stage / continuous tasks.

Generate command:

```bash
node harness/core/operations/create-operation-docs.js <initiative>
```

Defaults to generating in `docs/operations/<initiative>/`.

Generated files:

- `current-<initiative>.md`
- `<initiative>-board.md`
- `<initiative>-matrix.md`
- `<initiative>-decisions.md`
