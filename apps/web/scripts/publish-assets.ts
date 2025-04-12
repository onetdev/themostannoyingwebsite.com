import { cp } from 'fs/promises';

const src = './node_modules/@maw/content-api/data';
const dest = './public/assets/articles';

console.log(`Copying article assets from ${src} to ${dest}`);
await cp(src, dest, { recursive: true });
console.log(`Assets have been published.\n`);
