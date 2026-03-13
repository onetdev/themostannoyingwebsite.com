# The Most Annoying Website

A satirical web project that gathers the worst UX patterns from modern websites and concentrates them into one gloriously frustrating experience.

Everything is intentionally broken. Buttons lie, forms misbehave, notifications never stop, and progress bars cheat. Easter eggs and internet culture references in every single segment of the project.

🌐 **Live site:** https://themostannoyingwebsite.com


## What is this?

The Most Annoying Website is an experiment in **anti-UX**.

It recreates frustrating interaction patterns commonly found on the web and exaggerates them for satire and experimentation.

Examples include:

- deceptive buttons
- fake loading indicators
- intrusive notifications
- misleading forms
- endless popups
- dark patterns

Nothing behaves as it would on a normal website.

Despite the chaos:

- No personal data is collected or stored.
- Accessibility is still taken seriously.
- The site is designed to run as a **static build** whenever possible.

## Features

- Collection of UX anti-patterns
- Hidden easter eggs across the site
- Static-first architecture
- No user tracking or personal data storage
- Accessible despite intentionally frustrating UX

## Tech Stack

### Core

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Turborepo](https://turbo.build/repo/docs)

### UI

- [TailwindCSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)

### Tooling

- [pnpm](https://pnpm.io/)
- [Biome](https://biomejs.dev/)

### Testing

- [Jest](https://jestjs.io/)
- [Playwright](https://playwright.dev/)

## Quick Start

### Requirements

- Node.js (version defined in `mise.toml`)
- pnpm

### Install dependencies

```bash
pnpm install
```

### Run development server

```bash
pnpm dev
# then open: https://localhost:3000
```

### Run Storybook (UI Documentation)

```bash
pnpm dev --filter ui-docs
# then open: http://localhost:6006
```

*Some browser APIs require HTTPS during development.*

## Project structure

This repository uses a Turborepo monorepo.

```
apps/
  web        – main Next.js application
  ui-docs    – Storybook component documentation

packages/
  ui-lib     – shared UI components
  utils      – shared utilities
  logger     – shared logging
  config-*   – shared configuration
  content-api – content and article system
```

Detailed architecture documentation can be found in:

docs/architecture.md

## Development Documentation

Additional development documentation:
```
docs/development.md
docs/testing.md
docs/i18n.md
```

Architecture decisions are documented in:

```
adr/*
```

## Roadmap

Planned improvements and ideas are tracked on the GitHub project board:

https://github.com/users/onetdev/projects/2

## Contributing

Ideas for new annoying UX patterns are welcome.

Open an issue or submit a pull request if you have something particularly terrible in mind.

## Deployment

Pull requests automatically deploy preview builds on Vercel.

Commits to the main branch deploy to the production site.

## License

MIT


## Credits

Various assets and sounds are used under permissive licenses.
- Article covers and some content: generated with AI tools (DALL-E, ChatGPT, Gemini) and curated by humans
- New message notification sound: https://pixabay.com/sound-effects/film-special-effects-new-notification-014-363678/
- Achievement sound: https://pixabay.com/sound-effects/technology-achievement-unlocked-463070/
- Cookie jar animation: https://lottiefiles.com/free-animation/saving-the-money-C9plsMchxQ
- Icons: https://fontawesome.com
- Lava photo (“Hot Things”): https://unsplash.com/photos/80x3QULJDN4

---

🧪 May your UX be terrible, and your JS bundles large.

With love,
— The Most Annoying Website team ❤️‍🔥
