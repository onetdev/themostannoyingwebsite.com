import { Dirent } from 'fs';
import fs from 'fs/promises';
import path from 'path';
import sanitizeHtml from 'sanitize-html';
import sharp from 'sharp';
import { parse } from 'yaml';

import articleEntrySimplifiedZod from '@/lib/schemas/article-entry-simplified';
import { ArticleIndexEntrySchema } from '@/lib/schemas/article-index-entry';
import { parse as parseMd } from '@/lib/utils/markdown';
import i18nConfig from '@/root/next-i18next.config';

const articlesRootPath = path.join('./public/assets/articles');
const locales = i18nConfig.i18n.locales;
const articleDirPattern = new RegExp(
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
        path.join(articlesRootPath, `${locale}-meta.json`),
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

  console.log('Loading locale specific indices');
  console.group();

  const results = resultRaw.reduce(
    (carry, current) => {
      console.log(`${current.locale} ${current.success ? '✓' : '✗'}`);
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

  console.groupEnd();

  return results;
};

const resolveArticle = async (
  entry: Dirent,
  localeMeta: Awaited<ReturnType<typeof getLocaleMeta>>,
) => {
  const match = entry.name.match(articleDirPattern);
  if (!match) {
    return null;
  }

  const articlePath = path.join(articlesRootPath, entry.name);
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
  } catch (_err) {
    hasCoverImage = false;
  }

  let content: string;
  if ((data.contentFormat || 'markdown') === 'markdown') {
    content = parseMd(data.content);
  } else {
    content = sanitizeHtml(data.content);
  }

  console.log(entry.name);
  // Denormalized data
  return {
    publishedAt: data.publishedAt,
    directory: entry.name,
    intro: data.intro,
    locale: match[1],
    slug: match[3],
    title: data.title,
    hasCoverImage,
    content: content,
    isOnCover: localeMeta[match[1]].onCover.includes(entry.name),
    isHighlighted: localeMeta[match[1]].highlighted.includes(entry.name),
  } satisfies ArticleIndexEntrySchema;
};

const main = async () => {
  const localeMeta = await getLocaleMeta();
  const fsEntries = await fs.readdir(articlesRootPath, { withFileTypes: true });
  const candidates = fsEntries.filter((entry) => entry.isDirectory());

  console.log('Resolving articles:');
  console.group();
  const resolverQueue = candidates.map((item) =>
    resolveArticle(item, localeMeta),
  );
  const resolved = (await Promise.all(resolverQueue)).filter(
    (entry) => entry !== null,
  );
  console.groupEnd();

  const indexFile = path.join(articlesRootPath, 'index.json');
  await fs.writeFile(indexFile, JSON.stringify(resolved));
};

console.log('Generating article index...');
main()
  .then(() => console.log(`Aaaaand it's done. New index created.\n`))
  .catch((err) => console.error(`Ooopsie, something went wrong: ${err}`));
