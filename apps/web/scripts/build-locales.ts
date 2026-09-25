import fs from 'node:fs';
import { getLogger } from '@maw/logger';
import { Command } from 'commander';

import { fetchSupportedLanguages } from '@/services/use-cases/get-supported-locales';

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
  .parse(process.argv);

const options = program.opts();
const outputPath = options.output;

async function main() {
  logger.info(`🔄 Generating supported locales into '${outputPath}'...`);

  // `fetchSupportedLanguages` already falls back to the bundled (English-only)
  // list when the Content API is unreachable.
  const items = await fetchSupportedLanguages();

  if (items.length <= 1) {
    logger.warn(
      'Content API unavailable or returned no extra locales; generated an English-only list.',
    );
  } else {
    logger.info(`Fetched ${items.length} locales from the Content API.`);
  }

  if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath);
  }

  fs.writeFileSync(outputPath, JSON.stringify({ items }, null, 2));
  logger.info('✅ Done generating supported locales.');
}

main().catch((error) => {
  logger.error(error);
  process.exit(1);
});
