# UI library

Contains all the higher level components without caring about Next.js - _it does care about Tailwind_. This package also contains storybook entries but it isn't responsible for actually providing Storybook GUI.

## Installation

### 1. Install the package

```bash
pnpm i @maw/ui
```

### 2. Installing tailwind

Depending on the usage you might also want to configure Tailwind.

## Troubleshooting

### **Looks like styles are not being applied and you are not even getting errors?**

You probably need to mark the source paths for tailwind static analyzer, you might want to add your intermediate global.css file where you import the one from this package and add source lines below the import. Eventually having something like this:

```css
@import "@maw/ui/global.css";

@source "../node_modules/@maw/ui/src";
@source "./";
```

[Read more](https://tailwindcss.com/docs/detecting-classes-in-source-files)
