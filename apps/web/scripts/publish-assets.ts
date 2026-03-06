import { cp } from 'node:fs/promises';
import { getLogger } from '@maw/logger';

const logger = getLogger().getSubLogger({
  name: 'publish-assets',
});
const src = './node_modules/@maw/content-api/data/assets';
const dest = './public/assets/articles';

logger.info(`🔄 Copying article assets from ${src} to ${dest}...`);
await cp(src, dest, { recursive: true });
logger.info(`✅ Assets have been published.`);
