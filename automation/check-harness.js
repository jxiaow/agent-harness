#!/usr/bin/env node

const path = require('path');
const { spawnSync } = require('child_process');

const rootDir = path.resolve(__dirname, '../../..');
const defaultReportPath = '.tmp/harness-check-report.json';

function runNodeScript(scriptPath, args = []) {
  const commandLabel = ['node', scriptPath, ...args].join(' ');
  console.log(`> ${commandLabel}`);

  const result = spawnSync(process.execPath, [scriptPath, ...args], {
    cwd: rootDir,
    encoding: 'utf8',
  });

  if (result.stdout) {
    process.stdout.write(result.stdout);
  }
  if (result.stderr) {
    process.stderr.write(result.stderr);
  }

  return result.status || 0;
}

function resolveMode(argv) {
  return argv.includes('--staged') ? '--staged' : '--changed';
}

function resolveMaxIssueArgs(argv) {
  const index = argv.indexOf('--max-issues');
  if (index === -1) return [];
  const value = argv[index + 1];
  return value ? ['--max-issues', value] : [];
}

function resolveSummaryArgs(argv) {
  return argv.includes('--summary') ? ['--summary'] : [];
}

function resolveReportArgs(argv) {
  const index = argv.indexOf('--report');
  if (index !== -1) {
    const value = argv[index + 1];
    return value ? ['--report', value] : [];
  }
  return ['--report', defaultReportPath];
}

function resolveExplicitTargets(argv) {
  const targets = [];
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === '--max-issues' || value === '--report') {
      index += 1;
      continue;
    }
    if (value === '--summary' || value === '--changed' || value === '--staged') continue;
    if (!value.startsWith('--')) targets.push(value);
  }
  return targets;
}

function main() {
  const argv = process.argv.slice(2);
  const explicitTargets = argv.includes('--staged') ? [] : resolveExplicitTargets(argv);
  const mode = resolveMode(argv);
  const maxIssueArgs = resolveMaxIssueArgs(argv);
  const summaryArgs = resolveSummaryArgs(argv);
  const reportArgs = resolveReportArgs(argv);

  const processScript = path.join('harness', 'core', 'automation', 'check-process.js');
  const entryScript = path.join('harness', 'core', 'automation', 'check-entry.js');

  const processArgs =
    explicitTargets.length > 0
      ? [...explicitTargets, ...summaryArgs, ...maxIssueArgs, ...reportArgs]
      : [mode, ...summaryArgs, ...maxIssueArgs, ...reportArgs];

  const entryArgs =
    explicitTargets.length > 0
      ? ['--files', ...explicitTargets, ...summaryArgs, ...maxIssueArgs, ...reportArgs]
      : [mode, ...summaryArgs, ...maxIssueArgs, ...reportArgs];

  const checks = [
    [processScript, processArgs],
    [entryScript, entryArgs],
  ];

  for (const [script, args] of checks) {
    const status = runNodeScript(script, args);
    if (status !== 0) {
      process.exit(status);
    }
  }

  console.log('harness checks passed');
}

if (require.main === module) {
  main();
}

module.exports = {
  main,
  resolveMode,
  resolveMaxIssueArgs,
  resolveSummaryArgs,
  resolveReportArgs,
  resolveExplicitTargets,
  runNodeScript,
};
