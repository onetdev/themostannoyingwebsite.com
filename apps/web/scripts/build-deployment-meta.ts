import fs from 'fs';

import deploymentMeta from '@/root/deployment-meta.mjs';

const path = './public/deployment-meta.json';

// TODO: next/config -> getConfig doesn't work in our case thus we exporting
//   a static version of this config that can be loaded by the FE

console.log(`Generating deployment meta info into '${path}'`);
if (fs.existsSync(path)) {
  fs.unlinkSync(path);
}

fs.writeFileSync(path, JSON.stringify(deploymentMeta, null, 2));
