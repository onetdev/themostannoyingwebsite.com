import fs from 'fs';

import environmentConfig from '@/root/environment.config';

const path = './public/env-manifest.json';

console.log('Generating environment manifest...');
if (fs.existsSync(path)) {
  fs.unlinkSync(path);
}

console.debug(path);
fs.writeFileSync(path, JSON.stringify(environmentConfig, null, 2));
