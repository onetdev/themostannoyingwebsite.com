import { getLogger } from '@maw/logger';
import fs from 'fs';
import { zodToJsonSchema } from 'zod-to-json-schema';

import articleEntrySimplifiedZod from '@/schemas/article-entry-simplified';
import articleIndexEntryZod from '@/schemas/article-index-entry';
import articleLocaleMetaZod from '@/schemas/article-locale-meta';

type TypeConflictBypass = any;

const logger = getLogger().getSubLogger({
  name: 'build-json-schema',
});

const writeMap = {
  './src/schemas/article-entry-simplified.schema.json': zodToJsonSchema(
    articleEntrySimplifiedZod as TypeConflictBypass,
  ),
  './src/schemas/article-index-entry.schema.json': zodToJsonSchema(
    articleIndexEntryZod as TypeConflictBypass,
  ),
  './src/schemas/article-locale-meta.schema.json': zodToJsonSchema(
    articleLocaleMetaZod as TypeConflictBypass,
  ),
};

logger.info('🔄 Generating JSON schemas...');
Object.entries(writeMap).forEach(([path, schema]) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }

  logger.debug(path);
  fs.writeFileSync(path, JSON.stringify(schema, null, 2));
});
logger.info('✅ JSON schemas generated.');
