import { getLogger } from '@maw/logger';
import { type FaviconFile, type FaviconImage, favicons } from 'favicons';
import fs from 'fs/promises';
import path from 'path';

import manifestConfig from '@/root/manifest.config.mjs';

const logger = getLogger().child({
  script: 'build-web-manifest',
});

const main = async () => {
  const faviconSource = './public/assets/appicon.png';
  const manifestDestPath = path.join('./public/', manifestConfig.path!);

  logger.info(`Generating favicons from ${faviconSource}`);
  const response = await favicons(faviconSource, manifestConfig);

  logger.info(`Writing images into ${manifestDestPath}`);
  await storeFiles(manifestDestPath, response.images);

  logger.info(`Moving favicon into public root`);
  await fs.copyFile(
    path.join(manifestDestPath, 'favicon.ico'),
    './public/favicon.ico',
  );
  await fs.rm(path.join(manifestDestPath, 'favicon.ico'));

  logger.info(`Writing manifest into ${manifestDestPath}`);
  await storeFiles(manifestDestPath, response.files);
};

const autoGeneratedWarning = `## Important\n
This folder was generated by \`gen-manifest\` script. Do not edit it manually, as it will be overwritten on the next run.`;

const storeFiles = async (
  targetPath: string,
  files: FaviconImage[] | FaviconFile[],
) => {
  await fs.mkdir(targetPath, { recursive: true });
  await fs.writeFile(path.join(targetPath, 'README.md'), autoGeneratedWarning);
  await Promise.all(
    files.map(
      async (file) =>
        await fs.writeFile(path.join(targetPath, file.name), file.contents),
    ),
  );
};

logger.info('🔄 Generating manifest...');
main()
  .then(() => logger.info(`✅ Aaaaand it's done. New manifest created.`))
  .catch((err) => logger.error(err, `Ooopsie, something went wrong.`));
