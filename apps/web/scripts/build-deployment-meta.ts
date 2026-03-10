import fs from 'node:fs';
import { getLogger } from '@maw/logger';
import { Command } from 'commander';

import deploymentMeta from '@/root/deployment-meta.mjs';

const logger = getLogger().getSubLogger({
  prettyLogTemplate: '{{dateIsoStr}} {{logLevelName}} ',
  name: 'build-deployment-meta',
});

const program = new Command();

program
  .name('build-deployment-meta')
  .description('Generate deployment meta info')
  .option('-o, --output <path>', 'Output path', './public/deployment-meta.json')
  .parse(process.argv);

const options = program.opts();
const path = options.output;

logger.info(`🔄 Generating deployment meta info into '${path}'...`);
if (fs.existsSync(path)) {
  fs.unlinkSync(path);
}

fs.writeFileSync(path, JSON.stringify(deploymentMeta, null, 2));
logger.info('✅ Done generating deployment meta.');
