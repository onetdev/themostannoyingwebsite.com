import type { Dirent } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { getLogger } from '@maw/logger';
import sanitizeHtml from 'sanitize-html';
import sharp from 'sharp';
import { parse } from 'yaml';

import {
  ArticleLanguageSchema,
  ArticleSharedSchema,
} from '@/schemas/article-entry';
import type { ArticleIndexEntrySchema } from '@/schemas/article-index-entry';
import { parse as parseMd } from '@/utils/markdown';

const logger = getLogger().getSubLogger({
  name: 'build-index',
});
const locales = ['en', 'hu'];
const sourceRootPath = path.join('./data');
// Pattern for folder: {id}-{slug}
const validArticleDirPattern = /^([0-9]*)-(.*)$/i;

const getLocaleMeta = async () => {
  const queue = locales.map(async (locale) => {
    let onCover: string[] = [];
    let highlighted: string[] = [];
    let success: boolean;

    try {
      const dataRaw = await fs.readFile(
        path.join(sourceRootPath, `${locale}-meta.json`),
      );
      const data = JSON.parse(dataRaw.toString());

      onCover = data['on-cover'];
      highlighted = data.highlighted;
      success = true;
    } catch (_err) {
      success = false;
    }

    return {
      locale,
      onCover,
      highlighted,
      success,
    };
  });

  const resultRaw = await Promise.all(queue);

  logger.info('🔄 Loading locale specific indices');

  const results = resultRaw.reduce(
    (carry, current) => {
      if (current.success === true) {
        logger.info(`✅ Lang#${current.locale}: loaded!`);
      } else {
        logger.warn(`❌ Lang#${current.locale}: Failed to load, skipping...`);
      }

      carry[current.locale] = current;
      return carry;
    },
    {} as Record<
      string,
      {
        onCover: string[];
        highlighted: string[];
      }
    >,
  );

  logger.info('✅ Indicies loaded.');

  return results;
};

const resolveArticleLocales = async (
  entry: Dirent,
  localeMeta: Awaited<ReturnType<typeof getLocaleMeta>>,
): Promise<ArticleIndexEntrySchema[]> => {
  const match = entry.name.match(validArticleDirPattern);
  if (!match) {
    return [];
  }

  const articlePath = path.join(sourceRootPath, entry.name);

  // 1. Read shared data
  const sharedDataRaw = await fs.readFile(path.join(articlePath, 'data.yml'));
  const sharedDataParsed = ArticleSharedSchema.parse(
    parse(sharedDataRaw.toString()),
  );

  const results: ArticleIndexEntrySchema[] = [];

  // 2. Read each locale data
  for (const locale of locales) {
    const langFilePath = path.join(articlePath, `${locale}.yml`);
    try {
      await fs.access(langFilePath);
    } catch {
      logger.warn(
        `⚠️ Locale "${locale}" not found for ${entry.name}, skipping.`,
      );
      continue;
    }

    const langDataRaw = await fs.readFile(langFilePath);
    const langData = ArticleLanguageSchema.parse(parse(langDataRaw.toString()));

    const coverImage = langData.coverImage || sharedDataParsed.coverImage;
    let finalCoverImage: string | undefined;

    if (coverImage) {
      try {
        const assetsPath = path.join(sourceRootPath, 'assets');
        const coverPath = path.join(assetsPath, coverImage);
        await fs.access(coverPath);

        const filenameWithoutExt = coverImage.replace(/\.[^/.]+$/, '');
        const thumbnailFilename = `${filenameWithoutExt}-480x270.gen.webp`;
        const thumbnailPath = path.join(assetsPath, thumbnailFilename);

        await sharp(coverPath)
          .resize(480, 270)
          .webp({ quality: 75 })
          .toFile(thumbnailPath);

        finalCoverImage = coverImage;
      } catch (err) {
        logger.warn(
          err,
          `Failed to load cover image "${coverImage}" for ${entry.name} [${locale}]. It will be skipped.`,
        );
      }
    }

    let content: string;
    if ((langData.contentFormat || 'markdown') === 'markdown') {
      content = parseMd(langData.content);
    } else {
      content = sanitizeHtml(langData.content);
    }

    const localeMetaEntry = localeMeta[locale]!;

    results.push({
      publishedAt: sharedDataParsed.publishedAt,
      updatedAt: sharedDataParsed.updatedAt,
      directory: entry.name,
      intro: langData.intro,
      locale: locale,
      slug: langData.slug,
      title: langData.title,
      coverImage: finalCoverImage,
      content: content,
      isOnCover: localeMetaEntry.onCover.includes(entry.name),
      isHighlighted: localeMetaEntry.highlighted.includes(entry.name),
    });
  }

  logger.info(entry.name);
  return results;
};

const main = async () => {
  const localeMeta = await getLocaleMeta();
  const fsEntries = await fs.readdir(sourceRootPath, { withFileTypes: true });
  const candidates = fsEntries.filter(
    (entry) => entry.isDirectory() && entry.name !== 'assets',
  );

  logger.info('🔄 Resolving articles...');
  const resolverQueue = candidates.map((item) =>
    resolveArticleLocales(item, localeMeta),
  );
  const resolved = (await Promise.all(resolverQueue)).flat();
  logger.info('✅ Articles resolved.');

  const indexFile = path.join(sourceRootPath, 'index.json');
  await fs.writeFile(indexFile, JSON.stringify(resolved));
};

logger.info('🔄 Generating article index...');
main()
  .then(() => logger.info(`✅ Aaaaand it's done. New index created.\n`))
  .catch((err) => logger.error(err, `Ooopsie, something went wrong`));
