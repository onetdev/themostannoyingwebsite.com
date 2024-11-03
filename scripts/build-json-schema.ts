import fs from 'fs';
import { zodToJsonSchema } from 'zod-to-json-schema';

import articleEntrySimplifiedZod from '@/root/src/lib/schemas/article-entry-simplified';
import articleIndexEntryZod from '@/root/src/lib/schemas/article-index-entry';
import articleLocaleMetaZod from '@/root/src/lib/schemas/article-locale-meta';

const writeMap = {
  './src/lib/schemas/article-entry-simplified.schema.json': zodToJsonSchema(
    articleEntrySimplifiedZod,
  ),
  './src/lib/schemas/article-index-entry.schema.json':
    zodToJsonSchema(articleIndexEntryZod),
  './src/lib/schemas/article-locale-meta.schema.json':
    zodToJsonSchema(articleLocaleMetaZod),
};

console.log('Generating JSON schemas...');
console.group();
Object.entries(writeMap).map(([path, schema]) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }

  console.debug(path);
  fs.writeFileSync(path, JSON.stringify(schema, null, 2));
});
console.groupEnd();
