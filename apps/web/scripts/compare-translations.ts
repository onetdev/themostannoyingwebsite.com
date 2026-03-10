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

async function run() {
  const files = fs.readdirSync(MESSAGES_DIR).filter((f) => f.endsWith('.ts'));
  const locales = files.map((f) => f.replace('.ts', ''));

  if (!locales.includes('en')) {
    logger.error(`Error: en.ts not found in ${MESSAGES_DIR}`);
    process.exit(1);
  }

  // Use dynamic imports. Since we're in a ESM environment, we need to handle paths carefully.
  // Note: tsx will resolve these relative to the current script or the tsconfig paths.
  const enPath = path.join(MESSAGES_DIR, 'en.ts');
  const enModule = await import(enPath);
  const enFlattened = flatten(enModule.default);
  const enKeys = Object.keys(enFlattened);
  const enKeySet = new Set(enKeys);

  logger.info(`🔍 Translation Comparison Report`);
  logger.info(`==============================`);
  logger.info(`Base locale: en (${enKeys.length} keys)\n`);

  let totalIssues = 0;

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
        totalIssues++;
        logger.warn(`❌ ${locale.toUpperCase()}: Found asymmetry`);
        if (missingInLocale.length > 0) {
          logger.warn(`   - Missing (${missingInLocale.length}):`);
          for (const k of missingInLocale) {
            logger.warn(`      - ${k}`);
          }
        }
        if (extraInLocale.length > 0) {
          logger.warn(`   + Extra (${extraInLocale.length}, not in English):`);
          for (const k of extraInLocale) {
            logger.warn(`      + ${k}`);
          }
        }
      }
    } catch (err) {
      logger.error(err, `Error processing locale ${locale}`);
    }
  }

  if (totalIssues === 0) {
    logger.info(`\n🎉 All locales are synchronized with English!`);
  } else {
    logger.warn(`\n⚠️ Found issues in ${totalIssues} locale(s).`);
  }
}

const isMain =
  process.argv[1] && fileURLToPath(import.meta.url).endsWith(process.argv[1]);

if (isMain) {
  run().catch((err) => {
    logger.error(err);
    process.exit(1);
  });
}
