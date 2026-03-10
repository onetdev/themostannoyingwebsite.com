import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getLogger } from '@maw/logger';

const logger = getLogger().getSubLogger({
  prettyLogTemplate: '{{dateIsoStr}} {{logLevelName}} ',
  name: 'compare-translations',
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MESSAGES_DIR = path.resolve(__dirname, '../src/i18n/messages');
const APP_DIR = path.resolve(__dirname, '../src/app');

/**
 * Flattens a nested object into a dot-notation KV object.
 */
function flatten(
  obj: Record<string, unknown>,
  prefix = '',
): Record<string, unknown> {
  return Object.entries(obj).reduce(
    (acc, [k, v]) => {
      const key = prefix ? `${prefix}.${k}` : k;

      if (v && typeof v === 'object' && !Array.isArray(v)) {
        Object.assign(acc, flatten(v as Record<string, unknown>, key));
      } else {
        acc[key] = v;
      }

      return acc;
    },
    {} as Record<string, unknown>,
  );
}

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

async function run() {
  const files = fs.readdirSync(MESSAGES_DIR).filter((f) => f.endsWith('.ts'));
  const locales = files.map((f) => f.replace('.ts', ''));

  if (!locales.includes('en')) {
    logger.error(`Error: en.ts not found in ${MESSAGES_DIR}`);
    process.exit(1);
  }

  // --- Phase 1: Locale Messages ---
  logger.info(`===================================`);
  logger.info(`PHASE 1: Locale Messages Comparison`);
  logger.info(`===================================`);

  const enPath = path.join(MESSAGES_DIR, 'en.ts');
  const enModule = await import(enPath);
  const enFlattened = flatten(enModule.default);
  const enKeys = Object.keys(enFlattened);
  const enKeySet = new Set(enKeys);

  logger.info(`Base locale: en (${enKeys.length} keys)`);

  let messageIssues = 0;

  for (const locale of locales.sort()) {
    if (locale === 'en') continue;

    try {
      const localePath = path.join(MESSAGES_DIR, `${locale}.ts`);
      const localeModule = await import(localePath);
      const localeFlattened = flatten(localeModule.default);
      const localeKeys = Object.keys(localeFlattened);
      const localeKeySet = new Set(localeKeys);

      const missingInLocale = enKeys.filter((k) => !localeKeySet.has(k));
      const extraInLocale = localeKeys.filter((k) => !enKeySet.has(k));

      if (missingInLocale.length === 0 && extraInLocale.length === 0) {
        logger.info(`✅ ${locale.toUpperCase()}: Perfect match!`);
      } else {
        messageIssues++;
        logger.warn(`❌ ${locale.toUpperCase()}: Found asymmetry`);
        if (missingInLocale.length > 0) {
          logger.warn(`   - Missing (${missingInLocale.length}):`);
          for (const k of missingInLocale) logger.warn(`      - ${k}`);
        }
        if (extraInLocale.length > 0) {
          logger.warn(`   + Extra (${extraInLocale.length}, not in English):`);
          for (const k of extraInLocale) logger.warn(`      + ${k}`);
        }
      }
    } catch (err) {
      logger.error(err, `Error processing locale ${locale}`);
    }
  }

  // --- Phase 2: MDX Pages ---
  logger.info(`===============================`);
  logger.info(`PHASE 2: MDX Pages Availability`);
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

    const existingMdxLocales = [...new Set([...mdxFilesFromI18n, ...mdxFilesFromPageDir])];
    const mdxSet = new Set(existingMdxLocales);
    const missingLocales = locales.filter((l) => !mdxSet.has(l));

    if (missingLocales.length === 0) {
      logger.info(`✅ ${relativePath}: All locales present`);
    } else {
      mdxIssues++;
      logger.warn(`❌ ${relativePath}: Missing locales`);
      logger.warn(`   - Missing MDX (${missingLocales.length}): ${missingLocales.join(', ')}`);
    }
  }

  if (messageIssues === 0 && mdxIssues === 0) {
    logger.info(`🎉 All translation assets are synchronized!`);
  } else {
    logger.warn(`⚠️ Found issues in translation assets.`);
  }
}

const isMain =
  process.argv[1] &&
  fileURLToPath(import.meta.url).endsWith(process.argv[1]);

if (isMain) {
  run().catch((err) => {
    logger.error(err);
    process.exit(1);
  });
}
