import { Dirent } from 'fs';
import fs from 'fs/promises';
import { marked } from 'marked';
import path from 'path';
import sanitizeHtml from 'sanitize-html';
import { parse } from 'yaml';

import i18nConfig from '@/root/next-i18next.config';

const articlesRootPath = path.join('./public/articles');
const locales = i18nConfig.i18n.locales;
const articleDirPattern = new RegExp(
  `^(${locales.join('|')})-([0-9]*)-(.*)$`,
  'i',
);

const getLocaleMeta = async () => {
  const queue = locales.map(async (locale) => {
    const dataRaw = await fs.readFile(
      path.join(articlesRootPath, `${locale}-meta.json`),
    );
    const data = JSON.parse(dataRaw.toString());

    return {
      locale,
      onCover: data['on-cover'],
      highlighted: data['highlighted'],
    };
  });

  const resultRaw = await Promise.all(queue);

  return resultRaw.reduce(
    (carry, current) => {
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
  const dataRaw = await fs.readFile(path.join(articlePath, 'data.yml'));
  const data = parse(dataRaw.toString());

  let hasCover = false;
  try {
    await fs.access(path.join(articlePath, 'cover.jpg'));
    hasCover = true;
  } catch (_err) {
    hasCover = false;
  }

  let content: string;
  if ((data.contentFormat || 'markdown') === 'markdown') {
    content = sanitizeHtml(await marked.parse(data.content));
  } else {
    content = sanitizeHtml(data.content);
  }

  // Denormalized data
  return {
    publishedAt: data.publishedAt,
    directory: entry.name,
    intro: data.intro,
    locale: match[1],
    slug: match[3],
    title: data.title,
    hasCover,
    content: content,
    isOnCover: localeMeta[match[1]].onCover.includes(entry.name),
    isHighlighted: localeMeta[match[1]].highlighted.includes(entry.name),
  };
};

const main = async () => {
  const localeMeta = await getLocaleMeta();
  const fsEntries = await fs.readdir(articlesRootPath, { withFileTypes: true });
  const candidates = fsEntries.filter((entry) => entry.isDirectory());
  const resolverQueue = candidates.map((item) =>
    resolveArticle(item, localeMeta),
  );
  const resolved = (await Promise.all(resolverQueue)).filter(
    (entry) => entry !== null,
  );

  const indexFile = path.join(articlesRootPath, 'index.json');
  await fs.writeFile(indexFile, JSON.stringify(resolved));
};

console.log('Generating article index...');
main()
  .then(() => console.log(`Aaaaand it's done. New index created.\n`))
  .catch((err) => console.error(`Ooopsie, something went wrong: ${err}`));
