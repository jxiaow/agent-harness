#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

function normalizePath(filePath) {
  return filePath.split(path.sep).join('/');
}

function readIfExists(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
}

function buildIssue(rule, file, message) {
  return { rule, file, message };
}

function getViewName(relativePath) {
  return path.basename(relativePath, '.vue');
}

function isDesktopView(relativePath) {
  return /^apps\/desktop-ui\/src\/views\/.+\.vue$/.test(relativePath);
}

function isSyncRoute(relativePath) {
  return (
    /^apps\/sync-server\/src\/routes\/.+\.js$/.test(relativePath) ||
    /^apps\/sync-server\/src\/routes\/.+\/index\.js$/.test(relativePath) ||
    /^apps\/sync-server\/routes\/auth\.js$/.test(relativePath) ||
    /^apps\/sync-server\/routes\/data\/.+\.js$/.test(relativePath)
  );
}

function isEntryCheckCandidate(relativePath) {
  return isDesktopView(relativePath) || isSyncRoute(relativePath);
}

function getRouteName(relativePath) {
  const normalized = normalizePath(relativePath);
  const srcMatch = normalized.match(/^apps\/sync-server\/src\/routes\/([^/]+)/);
  if (srcMatch) {
    return srcMatch[1];
  }

  return path.basename(normalized, '.js');
}

function checkVueViewRouterEntry(relativePath, baseDir) {
  if (!isDesktopView(relativePath)) {
    return [];
  }

  const viewName = getViewName(relativePath);
  const routerPath = path.join(baseDir, 'apps/desktop-ui/src/router/index.js');
  const routerContent = readIfExists(routerPath);

  if (routerContent.includes(viewName) || routerContent.includes(`views/${viewName}.vue`)) {
    return [];
  }

  return [
    buildIssue(
      'vue-view-router-entry',
      relativePath,
      `New view ${viewName} must be registered in apps/desktop-ui/src/router/index.js`
    ),
  ];
}

function checkSyncRouteMounted(relativePath, baseDir) {
  if (!isSyncRoute(relativePath)) {
    return [];
  }

  if (/^apps\/sync-server\/src\/routes\/(compat|migration|sync)\//.test(relativePath)) {
    return [];
  }

  const routeName = getRouteName(relativePath);
  const createServerContent = readIfExists(
    path.join(baseDir, 'apps/sync-server/src/app/create-server.js')
  );
  const entryContent = createServerContent;

  if (
    entryContent.includes(`/api/${routeName}`) ||
    entryContent.includes(`/${routeName}`) ||
    entryContent.includes(`routes/${routeName}`) ||
    entryContent.includes(`../routes/${routeName}`) ||
    entryContent.includes(`../../../routes/${routeName}`)
  ) {
    return [];
  }

  return [
    buildIssue(
      'sync-route-mounted',
      relativePath,
      `New route ${routeName} must be mounted in create-server.js`
    ),
  ];
}

function checkAsyncRouteHandler(relativePath, content) {
  if (!isSyncRoute(relativePath)) {
    return [];
  }

  if (/^apps\/sync-server\/src\/routes\/migration\//.test(relativePath)) {
    return [];
  }

  if (!/\brouter\.(get|post|put|patch|delete)\s*\([^)]*async\s*\(/s.test(content)) {
    return [];
  }

  if (/asyncHandler\s*\(\s*async\s*\(/s.test(content)) {
    return [];
  }

  return [
    buildIssue('async-route-handler', relativePath, 'Async route handler must be wrapped with asyncHandler'),
  ];
}

function checkDirectPouchDb(relativePath, content) {
  if (!isSyncRoute(relativePath)) {
    return [];
  }

  if (/^apps\/sync-server\/src\/routes\/migration\//.test(relativePath)) {
    return [];
  }

  if (!/require\(['"]pouchdb['"]\)|require\(['"].*pouchdb-database['"]\)/.test(content)) {
    return [];
  }

  return [
    buildIssue('route-direct-pouchdb', relativePath, 'Route layer should not directly require PouchDB or database implementation'),
  ];
}

function checkFile(filePath, baseDir) {
  const relativePath = normalizePath(path.relative(baseDir, filePath));
  const content = readIfExists(filePath);

  return [
    ...checkVueViewRouterEntry(relativePath, baseDir),
    ...checkSyncRouteMounted(relativePath, baseDir),
    ...checkAsyncRouteHandler(relativePath, content),
    ...checkDirectPouchDb(relativePath, content),
  ];
}

function parseFiles(argv) {
  const filesIndex = argv.indexOf('--files');
  if (filesIndex === -1) {
    return [];
  }

  const files = [];
  for (let index = filesIndex + 1; index < argv.length; index += 1) {
    const value = argv[index];
    if (value.startsWith('--')) {
      break;
    }
    files.push(value);
  }

  return files;
}

function parseMaxIssues(argv) {
  const index = argv.indexOf('--max-issues');
  if (index === -1) {
    return 5;
  }

  const value = Number.parseInt(argv[index + 1], 10);
  return Number.isFinite(value) && value > 0 ? value : 5;
}

function parseReportPath(argv) {
  const index = argv.indexOf('--report');
  if (index === -1) {
    return null;
  }

  return argv[index + 1] || null;
}

function hasSummary(argv) {
  return argv.includes('--summary');
}

function collectGitChangedFiles(baseDir, mode) {
  const args = ['diff', '--name-only', '--diff-filter=ACMR'];
  if (mode === 'staged') {
    args.splice(1, 0, '--cached');
  }

  const result = spawnSync('git', args, { cwd: baseDir, encoding: 'utf8' });
  if (result.status !== 0) {
    return [];
  }

  const trackedFiles = result.stdout
    .split(/\r?\n/)
    .map(file => file.trim())
    .filter(Boolean);

  if (mode === 'staged') {
    return trackedFiles;
  }

  const untrackedResult = spawnSync('git', ['ls-files', '--others', '--exclude-standard'], {
    cwd: baseDir,
    encoding: 'utf8',
  });
  if (untrackedResult.status !== 0) {
    return trackedFiles;
  }

  const untrackedFiles = untrackedResult.stdout
    .split(/\r?\n/)
    .map(file => file.trim())
    .filter(Boolean);

  return [...new Set([...trackedFiles, ...untrackedFiles])];
}

function resolveTargetFiles(argv, baseDir) {
  const explicitFiles = parseFiles(argv);
  if (explicitFiles.length > 0) {
    return explicitFiles;
  }

  if (argv.includes('--staged')) {
    return collectGitChangedFiles(baseDir, 'staged');
  }

  if (argv.includes('--changed')) {
    return collectGitChangedFiles(baseDir, 'changed');
  }

  return [];
}

function printUsage() {
  console.log(
    'Usage: node harness/core/automation/check-entry.js --files <changed-file> [...]'
  );
  console.log('Usage: node harness/core/automation/check-entry.js --changed');
  console.log('Usage: node harness/core/automation/check-entry.js --staged');
  console.log('Option: --max-issues <n> limit issue output count, default 5');
  console.log('Option: --summary only output counts aggregated by rule');
  console.log(
    'Example: node harness/core/automation/check-entry.js --files apps/desktop-ui/src/views/Foo.vue'
  );
}

function printIssues(issues, maxIssues) {
  const visibleIssues = issues.slice(0, maxIssues);
  for (const issue of visibleIssues) {
    console.log(`${issue.file}`);
    console.log(`  rule: ${issue.rule}`);
    console.log(`  message: ${issue.message}\n`);
  }

  const hiddenCount = issues.length - visibleIssues.length;
  if (hiddenCount > 0) {
    console.log(`Another ${hiddenCount} issue(s) not shown; use --max-issues to adjust.`);
  }
}

function printSummary(issues) {
  const counts = new Map();
  for (const issue of issues) {
    counts.set(issue.rule, (counts.get(issue.rule) || 0) + 1);
  }

  for (const [rule, count] of counts.entries()) {
    console.log(`${rule}: ${count}`);
  }
}

function writeReport(reportPath, payload) {
  if (!reportPath) {
    return;
  }

  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`Detailed report: ${reportPath}`);
}

function run(argv, options = {}) {
  const baseDir = options.baseDir || process.cwd();
  const relativeFiles = resolveTargetFiles(argv, baseDir);
  const files = relativeFiles
    .map(file => path.resolve(baseDir, file))
    .filter(file => fs.existsSync(file))
    .filter(file => isEntryCheckCandidate(normalizePath(path.relative(baseDir, file))));
  const issues = files.flatMap(file => checkFile(file, baseDir));

  return { files, issues };
}

function main() {
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    printUsage();
    process.exit(0);
  }

  const argv = process.argv.slice(2);
  const { files, issues } = run(argv);
  const maxIssues = parseMaxIssues(argv);
  const summary = hasSummary(argv);
  const reportPath = parseReportPath(argv);
  if (files.length === 0) {
    if (argv.includes('--changed') || argv.includes('--staged') || parseFiles(argv).length > 0) {
      console.log('No entry check issues found (no checkable changed files)');
      process.exit(0);
    }

    printUsage();
    process.exit(1);
  }

  if (issues.length === 0) {
    console.log(`No entry check issues found(scanned ${files.length} files)`);
    process.exit(0);
  }

  console.log(`Found ${issues.length} entry check issue(s):\n`);
  if (summary) {
    printSummary(issues);
  } else {
    printIssues(issues, maxIssues);
  }
  writeReport(reportPath, { filesScanned: files.length, issues });

  process.exit(1);
}

if (require.main === module) {
  main();
}

module.exports = {
  main,
  run,
  checkFile,
  collectGitChangedFiles,
  isEntryCheckCandidate,
  parseMaxIssues,
  parseReportPath,
  hasSummary,
};
