import fs from 'fs';
import { zodToJsonSchema } from 'zod-to-json-schema';

import articleEntrySimplifiedZod from '@/schemas/article-entry-simplified';
import articleIndexEntryZod from '@/schemas/article-index-entry';
import articleLocaleMetaZod from '@/schemas/article-locale-meta';

const writeMap = {
  './src/schemas/article-entry-simplified.schema.json': zodToJsonSchema(
    articleEntrySimplifiedZod,
  ),
  './src/schemas/article-index-entry.schema.json':
    zodToJsonSchema(articleIndexEntryZod),
  './src/schemas/article-locale-meta.schema.json':
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
