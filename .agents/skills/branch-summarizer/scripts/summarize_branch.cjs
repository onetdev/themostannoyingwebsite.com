#!/usr/bin/env node
const { execSync } = require('node:child_process');

function run(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf-8' }).trim();
  } catch (_error) {
    return null;
  }
}

const targetBranch = process.argv[2] || 'origin/develop';
const currentBranch = run('git rev-parse --abbrev-ref HEAD');

console.log(`Summary of work on current branch: ${currentBranch}`);
console.log(`Compared to: ${targetBranch}\n`);

// Get commit messages
const log = run(`git log --oneline --no-merges ${targetBranch}..HEAD`);
if (log) {
  console.log('--- COMMITS ---');
  console.log(log);
} else {
  console.log('No new commits found.');
}

// Get file changes summary
const diffStat = run(`git diff --stat ${targetBranch}..HEAD`);
if (diffStat) {
  console.log('\n--- FILE CHANGES ---');
  console.log(diffStat);
} else {
  console.log('\nNo file changes found.');
}
