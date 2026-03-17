import { cp } from 'node:fs/promises';
import { getLogger } from '@maw/logger';
import { Command } from 'commander';

const logger = getLogger().getSubLogger({
  prettyLogTemplate: '{{dateIsoStr}} {{logLevelName}} ',
  name: 'publish-assets',
});

const program = new Command();

program
  .name('publish-assets')
  .description('Publish article assets from content-api to public folder')
  .option(
    '-s, --source <path>',
    'Source directory',
    './node_modules/@maw/content-api/data/assets',
  )
  .option(
    '-d, --destination <path>',
    'Destination directory',
    './public/assets/articles',
  )
  .parse(process.argv);

const options = program.opts();
const src = options.source;
const dest = options.destination;

logger.info(`🔄 Copying article assets from ${src} to ${dest}...`);
await cp(src, dest, { recursive: true });
logger.info(`✅ Assets have been published.`);
