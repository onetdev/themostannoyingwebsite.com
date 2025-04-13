# UI Documentation app

This is just a regular [Storybook](https://storybook.js.org/) application that loads stories from `@maw/ui` package and displays them.

**Please note** that with `@maw/ui` the goal is to keep the documentation close to their definition rather than having them detached in this repo.

## Running

You can run `pnpm dev` for development version and `pnpm build` for creating a production bundle.

## Maintenance

You can upgrade Storybook by running `npx storybook@latest upgrade`

### Want to add new story sources?

Check out `./storybook/main.ts > config.stories` for more info.
