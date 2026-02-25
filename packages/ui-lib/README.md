# UI Library

Contains all the higher-level components without direct dependency on Next.js — _while still leveraging Tailwind CSS_. This package also contains Storybook entries, but it is not responsible for hosting the Storybook GUI itself.

## Installation

### 1. Install the package

```bash
pnpm add @maw/ui-lib
```

### 2. Configuring Tailwind CSS

Depending on your environment, you may need to configure Tailwind to recognize the source files in this package.

## Troubleshooting

### Styles not being applied?

If styles are missing and you are not seeing any errors, the Tailwind CSS static analyzer might not be scanning this package's source files. You can add the following to your `global.css` or equivalent:

```css
@import "@maw/ui-lib/global.css";

@source "../node_modules/@maw/ui-lib/src";
@source "./";
```

[Read more about detecting classes in source files](https://tailwindcss.com/docs/detecting-classes-in-source-files)
