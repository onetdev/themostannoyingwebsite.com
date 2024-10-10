import { Dirent } from 'fs';
import fs from 'fs/promises';
import path from 'path';

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
  const metaContent = await fs.readFile(path.join(articlePath, 'meta.json'));
  const meta = JSON.parse(metaContent.toString());

  let hasCover = false;
  try {
    await fs.access(path.join(articlePath, 'cover.jpg'));
    hasCover = true;
  } catch (_err) {
    hasCover = false;
  }

  return {
    dateTime: meta.dateTime,
    directory: entry.name,
    intro: meta.intro,
    locale: match[1],
    slug: match[3],
    title: meta.title,
    hasCover,
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

main()
  .then(() => console.log(`Aaaaand it's done.`))
  .catch((err) => console.error(`Ooopsie, something went wrong: ${err}`));
