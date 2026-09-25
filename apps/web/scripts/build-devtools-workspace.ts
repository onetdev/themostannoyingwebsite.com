import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { getLogger } from '@maw/logger';
import { Command } from 'commander';

const APP_DIR = path.resolve(import.meta.dirname, '..');
const DEFAULT_OUTPUT = path.join(
  APP_DIR,
  'public',
  '.well-known',
  'appspecific',
  'com.chrome.devtools.json',
);

const logger = getLogger().getSubLogger({
  pretty: {
    template: '{{dateIsoStr}} {{logLevelName}} ',
  },
  name: 'build-devtools-workspace',
});

const program = new Command();

program
  .name('build-devtools-workspace')
  .description(
    'Generate the Chrome DevTools workspace descriptor for local development',
  )
  .option(
    '-o, --output <path>',
    'Output path for the generated descriptor',
    DEFAULT_OUTPUT,
  )
  .option('-r, --root <path>', 'Workspace root directory', APP_DIR)
  .option('--remove', 'Remove the generated descriptor instead of creating it')
  .parse(process.argv);

const options = program.opts<{
  output: string;
  root: string;
  remove?: boolean;
}>();

const outputPath = path.resolve(options.output);

const readExistingUuid = (): string | undefined => {
  try {
    const parsed = JSON.parse(fs.readFileSync(outputPath, 'utf8')) as {
      workspace?: { uuid?: unknown };
    };
    const uuid = parsed.workspace?.uuid;
    return typeof uuid === 'string' && uuid.length > 0 ? uuid : undefined;
  } catch {
    return undefined;
  }
};

const main = () => {
  if (options.remove) {
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
      logger.info(`🧹 Removed '${outputPath}'.`);
    } else {
      logger.info(`🧹 Nothing to remove at '${outputPath}'.`);
    }
    return;
  }

  logger.info(`🔄 Generating DevTools workspace into '${outputPath}'...`);

  const uuid = readExistingUuid() ?? crypto.randomUUID();
  const workspace = {
    workspace: {
      uuid,
      root: path.resolve(options.root),
    },
  };

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(workspace, null, 2)}\n`);

  logger.info('✅ Done generating the DevTools workspace descriptor.');
};

main();
