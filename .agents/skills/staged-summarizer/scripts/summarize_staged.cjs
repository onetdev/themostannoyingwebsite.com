#!/usr/bin/env node

const { execSync } = require('node:child_process');

function getStagedChanges() {
  try {
    return execSync('git diff --staged').toString();
  } catch (_err) {
    console.error('Error: No staged changes found or git not available.');
    process.exit(1);
  }
}

function summarizeStaged() {
  const diff = getStagedChanges();
  if (!diff) {
    console.log('No staged changes to summarize.');
    return;
  }

  // Minimalist approach for a script: output the diff and let the agent summarize it based on SKILL.md rules.
  // In a more complex version, we could use heuristics to identify type and scope.
  console.log('Staged changes identified. Use the following diff to generate a Conventional Commit summary:');
  console.log(diff);
}

summarizeStaged();
