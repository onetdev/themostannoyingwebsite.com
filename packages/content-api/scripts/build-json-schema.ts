import fs from 'node:fs';
import { getLogger } from '@maw/logger';
import { zodToJsonSchema } from 'zod-to-json-schema';
import {
  ArticleLanguageSchema,
  ArticleSharedSchema,
} from '@/schemas/article-entry';
import { ArticleSimplifiedSchema } from '@/schemas/article-entry-simplified';
import { ArticleIndexEntrySchema } from '@/schemas/article-index-entry';
import { ArticleLocaleMetaSchema } from '@/schemas/article-locale-meta';

const logger = getLogger().getSubLogger({
  name: 'build-json-schema',
});

const writeMap = {
  './src/schemas/article-entry-simplified.schema.json': zodToJsonSchema(
    ArticleSimplifiedSchema,
    'articleSimplifiedSchema',
  ),
  './src/schemas/article-shared.schema.json': zodToJsonSchema(
    ArticleSharedSchema,
    'articleSharedSchema',
  ),
  './src/schemas/article-language.schema.json': zodToJsonSchema(
    ArticleLanguageSchema,
    'articleLanguageSchema',
  ),
  './src/schemas/article-index-entry.schema.json': zodToJsonSchema(
    ArticleIndexEntrySchema,
    'articleIndexEntrySchema',
  ),
  './src/schemas/article-locale-meta.schema.json': zodToJsonSchema(
    ArticleLocaleMetaSchema,
    'articleLocaleMetaSchema',
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
