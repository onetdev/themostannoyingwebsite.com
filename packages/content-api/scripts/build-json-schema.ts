import { getLogger } from '@maw/logger';
import fs from 'fs';
import { zodToJsonSchema } from 'zod-to-json-schema';

import articleEntrySimplifiedZod from '@/schemas/article-entry-simplified';
import articleIndexEntryZod from '@/schemas/article-index-entry';
import articleLocaleMetaZod from '@/schemas/article-locale-meta';

const logger = getLogger().child({
  script: 'build-json-schema',
});

const writeMap = {
  './src/schemas/article-entry-simplified.schema.json': zodToJsonSchema(
    articleEntrySimplifiedZod,
  ),
  './src/schemas/article-index-entry.schema.json':
    zodToJsonSchema(articleIndexEntryZod),
  './src/schemas/article-locale-meta.schema.json':
    zodToJsonSchema(articleLocaleMetaZod),
};

logger.info('🔄 Generating JSON schemas...');
Object.entries(writeMap).map(([path, schema]) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }

  logger.debug(path);
  fs.writeFileSync(path, JSON.stringify(schema, null, 2));
});
logger.info('✅ JSON schemas generated.');
