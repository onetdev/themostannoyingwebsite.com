import { getLogger } from '@maw/logger';
import { Dirent } from 'fs';
import fs from 'fs/promises';
import path from 'path';
import sanitizeHtml from 'sanitize-html';
import sharp from 'sharp';
import { parse } from 'yaml';

import articleEntrySimplifiedZod from '@/schemas/article-entry-simplified';
import { ArticleIndexEntrySchema } from '@/schemas/article-index-entry';
import { parse as parseMd } from '@/utils/markdown';

const logger = getLogger().child({
  script: 'build-index',
});
const locales = ['en'];
const sourceRootPath = path.join('./data');
const validArticleDirPattern = new RegExp(
  `^(${locales.join('|')})-([0-9]*)-(.*)$`,
  'i',
);

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
      highlighted = data['highlighted'];
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

const resolveArticle = async (
  entry: Dirent,
  localeMeta: Awaited<ReturnType<typeof getLocaleMeta>>,
) => {
  const match = entry.name.match(validArticleDirPattern);
  if (!match) {
    return null;
  }

  const articlePath = path.join(sourceRootPath, entry.name);
  const fsData = await fs.readFile(path.join(articlePath, 'data.yml'));
  const dataUnsafe = parse(fsData.toString());
  const {
    data,
    success: isValid,
    error,
  } = articleEntrySimplifiedZod.safeParse(dataUnsafe);

  if (isValid === false) {
    throw Error('Invalid article data: ' + error);
  }

  let hasCoverImage = false;
  try {
    const coverPath = path.join(articlePath, 'cover.webp');
    await fs.access(coverPath);
    sharp(coverPath)
      .resize(480, 270)
      .webp({ quality: 75 })
      .toFile(path.join(articlePath, 'cover-480x270.webp'));

    hasCoverImage = true;
  } catch (err) {
    logger.warn(
      err,
      `Failed to load cover image for ${entry.name}. It will be skipped.`,
    );
    hasCoverImage = false;
  }

  let content: string;
  if ((data.contentFormat || 'markdown') === 'markdown') {
    content = parseMd(data.content);
  } else {
    content = sanitizeHtml(data.content);
  }

  logger.info(entry.name);

  const localeMetaEntry = localeMeta[match[1]!]!;
  // Denormalized data
  return {
    publishedAt: data.publishedAt,
    directory: entry.name,
    intro: data.intro,
    locale: match[1]!,
    slug: match[3]!,
    title: data.title,
    hasCoverImage,
    content: content,
    isOnCover: localeMetaEntry.onCover.includes(entry.name),
    isHighlighted: localeMetaEntry.highlighted.includes(entry.name),
  } satisfies ArticleIndexEntrySchema;
};

const main = async () => {
  const localeMeta = await getLocaleMeta();
  const fsEntries = await fs.readdir(sourceRootPath, { withFileTypes: true });
  const candidates = fsEntries.filter((entry) => entry.isDirectory());

  logger.info('🔄 Resolving articles...');
  const resolverQueue = candidates.map((item) =>
    resolveArticle(item, localeMeta),
  );
  const resolved = (await Promise.all(resolverQueue)).filter(
    (entry) => entry !== null,
  );
  logger.info('✅ Articles resolved.');

  const indexFile = path.join(sourceRootPath, 'index.json');
  await fs.writeFile(indexFile, JSON.stringify(resolved));
};

logger.info('🔄 Generating article index...');
main()
  .then(() => logger.info(`✅ Aaaaand it's done. New index created.\n`))
  .catch((err) => logger.error(err, `Ooopsie, something went wrong`));
