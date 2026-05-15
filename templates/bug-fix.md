# Bug Fix Template

## Goal

Locate the root cause and fix the problem with the smallest possible change surface.

## Minimal Analysis

Only add these 5 items by default:

- Symptom
- Expected behavior
- Root cause or suspected chain
- Fix surface
- Verification method

## Test Failure Triage

If the trigger is a test failure, or test failures are discovered during verification, first execute `harness/core/rules/test-failure-triage.md` before deciding whether to fix the test, the implementation, or the fixture.

Bug gate should include:

- Failure type: implementation regression / stale test contract / requirement change not synced to tests / environment or fixture issue
- Evidence: discrepancy between current requirements, implementation, and test assertions
- Fix direction: why this surface is being changed rather than reverting another

Never revert UI, behavior, or architecture that the user explicitly chose to keep just to make tests green.

## Only Add When Relevant

- Stable reproduction: add reproduction steps and trigger conditions
- Environment differences: add Web / desktop runtime / OS
- Logs, stack traces, screenshots: only reference key evidence
- Not yet reproduced: clarify which conclusions are only code path analysis
- Test failure: add Test failure triage conclusion

## Recommended Output

```text
Bug gate
- Symptom: ...
- Root cause/chain: ...
- Test triage: ...
- Fix surface: ...
- Verification: ...
```
