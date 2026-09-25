import fs from 'node:fs';
import { getLogger } from '@maw/logger';
import { Command } from 'commander';
import i18nConfig from '@/root/i18n.config';
import {
  buildSupportedLanguages,
  fetchSupportedLanguages,
  fetchSupportedLocaleMetaStrict,
  type LanguageInfo,
} from '@/services/use-cases/get-supported-locales';

const logger = getLogger().getSubLogger({
  pretty: {
    template: '{{dateIsoStr}} {{logLevelName}} ',
  },
  name: 'build-locales',
});

const program = new Command();

program
  .name('build-locales')
  .description('Generate the supported locale list from the Content API')
  .option('-o, --output <path>', 'Output path', './public/locales.json')
  .option(
    '--allow-fallback',
    'Write the bundled English-only list instead of failing when the Content API is unreachable',
    false,
  )
  .parse(process.argv);

const options = program.opts();
const outputPath = options.output;
const allowFallback =
  options.allowFallback || process.env.ALLOW_LOCALES_FALLBACK === 'true';

async function resolveLocales(): Promise<LanguageInfo[]> {
  if (allowFallback) {
    const items = await fetchSupportedLanguages();
    if (items.length <= 1) {
      logger.warn(
        'Content API unavailable; wrote the bundled English-only fallback list.',
      );
    }
    return items;
  }

  const meta = await fetchSupportedLocaleMetaStrict();
  const items = buildSupportedLanguages(meta);

  if (items.length === 0) {
    throw new Error('The Content API returned no supported locales.');
  }

  if (items.length < i18nConfig.locales.length) {
    logger.warn(
      `Content API returned ${items.length} of ${i18nConfig.locales.length} configured locales.`,
    );
  }

  return items;
}

async function main() {
  logger.info(`🔄 Generating supported locales into '${outputPath}'...`);

  const items = await resolveLocales();

  if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath);
  }

  fs.writeFileSync(outputPath, JSON.stringify({ items }, null, 2));
  logger.info(`✅ Done generating ${items.length} supported locales.`);
}

main().catch((error) => {
  logger.error(
    'Failed to generate the supported locale list. The Content API must be reachable at build time. ' +
      'Pass --allow-fallback or set ALLOW_LOCALES_FALLBACK=true to write the bundled English-only list instead.',
  );
  logger.error(error instanceof Error ? error.message : 'Unknown error');
  process.exit(1);
});
