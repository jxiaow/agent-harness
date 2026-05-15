# Verification Gate

## Goal

Turn "I think it works" into "here is how I verified it".

## Minimal Fields

Use multi-line short lists by default, up to 5 items:

- Verification method
- Key verification points
- Results
- Unverified items
- Residual risk

## Only Add When Relevant

- Bug: does it cover the original reproduction path and adjacent scenarios
- UI: are theme, states, and responsiveness checked
- Refactor: is external behavior confirmed unchanged
- Cross-module: are runtime boundaries, public interfaces, or bridge layers verified separately
- High-risk entry: which chains cannot be verified currently

## Recommended Output

```text
Verification gate
- Verified: ...
- Result: ...
- Unverified: ...
- Risk: ...
```

Can also use "Verified / Unverified / Risk" short grouping, but keep it concise.

Default requirements:

- Prefer commands and conclusions
- Simple tasks may reduce field count, but do not cram multiple fields into one line with semicolons
- When output alongside other gates, separate with blank lines before and after
- Complex tasks prefer 3-5 line short lists
- Do not omit unverified items or residual risk for brevity
- Unverified items must be preserved
- Code review cannot be stated as runtime verification

## Local Dev Server / Browser Verification

Frontend changes do not start a local dev server by default. First determine whether verification truly requires a browser runtime:

- Small-scope copy, style variables, spacing, static contracts, or pure logic changes: default to static checks, unit tests, contract tests, or build verification; do not occupy a port proactively.
- New pages, major UI overhauls, responsive/interaction/routing/real-render risks, or when the user explicitly requests preview/screenshot/browser inspection: start the dev server.
- Before starting, state the purpose, command, and expected port in a working update; after starting, provide the URL and confirm at closeout whether to keep or stop it.
- If the port is occupied, do not probe repeatedly; explain before switching ports. Failed start attempts should clean up residual processes or explain in Verification gate why they were not cleaned.
- Browser inspection conclusions can only cover paths, viewports, and states actually observed; do not write "server started" as "page verified".

## Good / Bad

Good:

```text
Verification gate
- Verified: npm run lint
- Result: pass
- Unverified: no end-to-end smoke test
- Risk: only static checks covered, real runtime environment not covered
```

Bad:

```text
Verification gate
- Code looks fine, should pass.
```
