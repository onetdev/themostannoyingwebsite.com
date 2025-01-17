import fs from 'fs';

import environmentConfig from '@/root/environment.config';

const path = './public/deployment-meta.json';

console.log('Generating environment manifest...');
if (fs.existsSync(path)) {
  fs.unlinkSync(path);
}

fs.writeFileSync(path, JSON.stringify(environmentConfig, null, 2));
console.log(`Saved into ${path}`);
