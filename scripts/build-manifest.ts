import { ESLint, Linter } from 'eslint';
import favicons, { type FaviconFile, type FaviconImage } from 'favicons';
import fs from 'fs/promises';
import path from 'path';

import eslintRules from '@/root/eslint.config.mjs';
import manifestConfig from '@/root/manifest.config.js';

const main = async () => {
  const faviconSource = './public/assets/appicon.png';
  const manifestDestPath = path.join('./public/', manifestConfig.path!);
  const headerDestFile = './src/components/templates/GeneratedMetaHead.tsx';

  console.log(`Generating favicons from ${faviconSource}`);
  const response = await favicons(faviconSource, manifestConfig);

  console.log(`Writing images into ${manifestDestPath}`);
  await storeFiles(manifestDestPath, response.images);

  console.log(`Moving favicon into public root`);
  await fs.copyFile(
    path.join(manifestDestPath, 'favicon.ico'),
    './public/favicon.ico',
  );
  await fs.rm(path.join(manifestDestPath, 'favicon.ico'));

  console.log(`Writing manifest into ${manifestDestPath}`);
  await storeFiles(manifestDestPath, response.files);

  console.log(`Generating html headers`);
  await storeAndFormatHeaders(
    headerDestFile,
    manifestConfig.path!,
    response.html,
  );
};

const autoGeneratedWarning = `## Important\n
This folder was generated by \`gen-manifest\` script. Do not edit it manually, as it will be overwritten on the next run.`;
const headerTemplate = `import { FunctionComponent } from 'react';
import Head from 'next/head';

// IMPORTANT: This file is auto-generated by the \`gen-manifest\` script.
const GeneratedMetaHead: FunctionComponent = () => (
  <Head>{{elements}}</Head>
);

export default GeneratedMetaHead;`;

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

const storeAndFormatHeaders = async (
  destination: string,
  assetPath: string,
  items: string[],
) => {
  // 1. normalizing data
  const headerFlat = items.reduce((carry, current) => {
    let processed = current;

    // LOL, what about self closing tags favicons pkg?
    if (!current.endsWith('/>') && current.endsWith('>')) {
      processed = `${current.slice(0, -1)}/>`;
    }

    // Moving favicon to root so it can be fetched without loading the root
    // html file first
    const faviconPath = path.join(assetPath, '/favicon.ico');
    if (current.match(faviconPath)) {
      processed = processed.replace(faviconPath, '/favicon.ico');
    }

    return `${carry}\n${processed}`;
  }, '');
  const headerInterpolated = headerTemplate.replace('{{elements}}', headerFlat);

  // 2. linting and formatting
  const eslint = new ESLint({
    fix: true,
    overrideConfig: eslintRules as Linter.Config[],
  });
  const formatted = await eslint.lintText(headerInterpolated, {
    filePath: './src/components/templates/GeneratedMetaHead.tsx',
  });

  if (formatted[0].errorCount > 0) {
    console.error(
      'FATAL ERROR during eslint formatting',
      formatted[0].messages || 'Something went wrong...',
    );
    process.exit(1);
  }

  // 3. flushing
  fs.writeFile(destination, formatted[0].output || '');
};

console.log('Generating manifest...');
main()
  .then(() => console.log(`Aaaaand it's done. New manifest created.\n`))
  .catch((err) => console.error(`Ooopsie, something went wrong: ${err}`));
