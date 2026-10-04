import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getLogger } from '@maw/logger';
import { Command } from 'commander';
import i18nConfig from '../i18n.config';

const logger = getLogger().getSubLogger({
  pretty: {
    template: '{{dateIsoStr}} {{logLevelName}} ',
  },
  name: 'compare-translations',
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_APP_DIR = path.resolve(__dirname, '../src/app');

const program = new Command();

program
  .name('compare-translations')
  .description('Compare localized MDX pages across locales')
  .option(
    '-a, --app-dir <path>',
    'App directory for MDX pages',
    DEFAULT_APP_DIR,
  )
  .parse(process.argv);

const options = program.opts();

/**
 * Finds all directories in the app folder that have an _i18n subfolder with MDX files.
 */
function findMdxPages(dir: string, results: string[] = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '_i18n') {
        results.push(dir);
      } else {
        findMdxPages(fullPath, results);
      }
    }
  }
  return results;
}

async function main() {
  const APP_DIR = options.appDir;
  const locales = [...i18nConfig.allLocales];

  // Message bundles for non-English locales are served by the Content API, so
  // only localized MDX pages are still compared here.
  logger.info(`===============================`);
  logger.info(`MDX Pages Availability`);
  logger.info(`===============================`);

  const mdxPagePaths = findMdxPages(APP_DIR);
  let mdxIssues = 0;

  for (const pagePath of mdxPagePaths) {
    const relativePath = path.relative(APP_DIR, pagePath);
    const i18nDir = path.join(pagePath, '_i18n');

    // Collect MDX files from both _i18n subfolder and the page folder itself
    const mdxFilesFromI18n = fs
      .readdirSync(i18nDir)
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => f.replace('.mdx', ''));

    const mdxFilesFromPageDir = fs
      .readdirSync(pagePath)
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => f.replace('.mdx', ''));

    const existingMdxLocales = [
      ...new Set([...mdxFilesFromI18n, ...mdxFilesFromPageDir]),
    ];
    const mdxSet = new Set(existingMdxLocales);
    const missingLocales = locales.filter((l) => !mdxSet.has(l));

    if (missingLocales.length === 0) {
      logger.info(`✅ ${relativePath}: All locales present`);
    } else {
      mdxIssues++;
      logger.warn(`❌ ${relativePath}: Missing locales`);
      logger.warn(
        `   - Missing MDX (${missingLocales.length}): ${missingLocales.join(', ')}`,
      );
    }
  }

  if (mdxIssues === 0) {
    logger.info(`🎉 All localized MDX pages are synchronized!`);
  } else {
    logger.warn(`⚠️ Found issues in localized MDX pages.`);
  }
}

main().catch((err) => {
  logger.error(err);
  process.exit(1);
});
