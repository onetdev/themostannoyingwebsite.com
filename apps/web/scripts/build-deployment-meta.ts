import { getLogger } from '@maw/logger';
import fs from 'fs';

import deploymentMeta from '@/root/deployment-meta.mjs';

const logger = getLogger().child({
  script: 'build-deployment-meta',
});
const path = './public/deployment-meta.json';

logger.info(`🔄 Generating deployment meta info into '${path}'...`);
if (fs.existsSync(path)) {
  fs.unlinkSync(path);
}

fs.writeFileSync(path, JSON.stringify(deploymentMeta, null, 2));
logger.info('✅ Done generating deployment meta.');
