# Gates

This directory contains stage gates for the execution process.

Current core gates:

- Requirement
- Design
- Implementation
- Verification
- Delivery
- Git

The agent should only proceed to the next stage after the current gate's minimum conditions are met. Once a gate passes, automatically proceed to the next stage without waiting for confirmation.

Execution order: Requirement → Design → Implementation → Verification → Delivery → Git
