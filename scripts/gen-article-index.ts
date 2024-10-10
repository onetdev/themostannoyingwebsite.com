import { Dirent } from 'fs';
import fs from 'fs/promises';
import path from 'path';

import i18nConfig from '@/root/next-i18next.config';

const articlesRootPath = path.join('./public/articles');
const locales = i18nConfig.i18n.locales;
const validPattern = new RegExp(`^(${locales.join('|')})-([0-9]*)-(.*)$`, 'i');

const resolveArticle = async (entry: Dirent) => {
  const match = entry.name.match(validPattern);
  if (!match) {
    return null;
  }

  const metaContent = await fs.readFile(
    path.join(articlesRootPath, entry.name, 'meta.json'),
  );
  const meta = JSON.parse(metaContent.toString());

  return {
    directory: entry.name,
    locale: match[1],
    slug: match[3],
    title: meta.title,
    date: meta.date,
  };
};

const main = async () => {
  const fsEntries = await fs.readdir(articlesRootPath, { withFileTypes: true });
  const candidates = fsEntries.filter((entry) => entry.isDirectory());
  const resolverQueue = await Promise.all(candidates.map(resolveArticle));
  const resolved = resolverQueue.filter((entry) => entry !== null);

  const indexFile = path.join(articlesRootPath, 'index.json');
  await fs.writeFile(indexFile, JSON.stringify(resolved));
};

main()
  .then(() => console.log(`Aaaaand it's done.`))
  .catch((err) => console.error(`Ooopsie, something went wrong: ${err}`));
