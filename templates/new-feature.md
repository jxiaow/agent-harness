# New Feature Template

## Goal

Clarify the feature goal, placement, and boundaries to avoid unbounded scope creep.

## Minimal Analysis

Only add these 5 items by default:

- Feature goal
- Target user / entry point
- Primary placement
- Success criteria
- Explicitly out of scope

## Only Add When Relevant

- Involves UI: add theme, responsiveness, component or view patterns
- Involves runtime bridge: add adapter / command / IPC / message boundaries
- Involves public interface: add entry point, state container, composition logic, and communication chain
- Involves new files: add application entry, registration entry, export entry, or dependency manifest

## Recommended Output

```text
Feature gate
- Goal: ...
- Placement: ...
- Key changes: ...
- Verification: ...
```
