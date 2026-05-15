# Cross Module Change Template

## Goal

Control the boundaries, dependency direction, and communication patterns of cross-module changes.

## Minimal Analysis

Only add these 5 items by default:

- Modules involved
- Primary change point
- Why a single module change is insufficient
- Key interfaces / communication chain
- Verification method

## Only Add When Relevant

- Touches runtime bridge: add adapter / command / IPC / message boundaries
- Touches public interface: add entry point, permission boundaries, and communication chain
- Touches state management: add state container, cache, or persistence boundaries
- Long-running / multi-stage: first list stage-level todo/checklist, execution order, and current first stage
- A smaller entry point exists: explain why it is not used this time

## Recommended Output

```text
Cross-module gate
- Modules: ...
- Primary target: ...
- Communication chain: ...
- Verification: ...
```
