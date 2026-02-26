# The Most Annoying Website

Gathering and concentrating the most annoying features of modern websites in one place, on steroids. The entire website is a fake facade filled with fun little Easter eggs; no feature functions as it would in a normal scenario.

## Mission

- Collecting the most annoying practices from the web and mobile.
- No personal data is transmitted or stored.
- Accessibility in focus — despite being annoying.
- Focus on static builds rather than dynamic server-side capabilities.

## Development cycle

Upcoming roadmap items on the [MAW GitHub project board](https://github.com/users/onetdev/projects/2)

Past releases and changelog items under [MAW releases](https://github.com/onetdev/themostannoyingwebsite.com/releases)

## Project tech

### Tooling

- [pnpm](https://pnpm.io/) - Node.js package manager
- [TypeScript](https://www.typescriptlang.org/docs/) - JavaScript typed superset language.
- [Turborepo](https://turbo.build/repo/docs) - Monorepo tooling
- [Biome](https://biomejs.dev/) - Toolchain for web projects (linting, formatting)
- [Playwright](https://playwright.dev/) - E2E testing framework
- [Jest](https://jestjs.io/) - Unit testing framework

### Framework and libraries

- [Next.js](https://nextjs.org/) - Web application framework
- [Storybook](https://storybook.js.org/) - Interactive showcase for components
- [TailwindCSS](https://tailwindcss.com/docs) - Utility-first styling
- [Shadcn](https://ui.shadcn.com/) + [Radix](https://www.radix-ui.com/) - UI framework
- [Zustand](https://github.com/pmndrs/zustand) - Multi-store state management
- [Zod](https://github.com/colinhacks/zod) - Validation & data structure description
- [Sentry](https://docs.sentry.io/platforms/javascript/guides/nextjs/) + [Vercel Analytics](https://vercel.com/docs/analytics/package) - Monitoring

### Testing

#### Unit Tests

The project mainly uses [Jest](https://jestjs.io/) for unit testing. To run the tests, use the following command:

```bash
pnpm test
```

#### End-to-End Tests

We use [Playwright](https://playwright.dev/) for end-to-end testing. 

**Prerequisites for E2E tests:**
- Make sure you have a fresh build of the project (`pnpm run build`)
- You might need to run `pnpm exec playwright install` for the first time to install the necessary browser binaries.

**Running E2E tests:**

```bash
# Run all E2E tests
pnpm test:e2e

# Run E2E tests from the web app directory
cd apps/web
pnpm test:e2e

# Run tests in headed mode (see browser)
cd apps/web
pnpm test:e2e --headed

# Run tests in UI mode (interactive)
cd apps/web
pnpx playwright test --ui
```

**View test results:**
After running tests, you can view the HTML report:
```bash
cd apps/web
pnpx playwright show-report
```

For detailed information about our E2E testing strategy, see `apps/web/e2e/README.md`.

### Project Structure

This is a Turborepo monorepo. Here's a quick rundown of the main folders:

- `apps/ui-docs`: Documentation for the UI components.
- `apps/web`: The main Next.js frontend.
- `packages/config-jest`: Shared Jest preset.
- `packages/config-ts`: Shared TypeScript config.
- `packages/content-api`: Content layer for articles and other dynamic content.
- `packages/logger`: Shared logger.
- `packages/ui-lib`: Shared UI components.
- `packages/utils`: Shared utility functions.

### Prerequisites

Before you can run this project locally, make sure you have the following installed:

- **Node.js** - Version specified in `mise.toml`
- **pnpm** - Package manager for dependencies
- **Version manager** (recommended) - Use mise, nvm, or similar

#### Installing Node.js with mise (recommended)

1. Install mise: `curl https://mise.run | sh`
2. Activate mise in your shell (follow the installation instructions)
3. Install Node.js: `mise install`

#### Installing pnpm

```bash
npm install -g pnpm
```

### Local development

1. Clone the repository and navigate to it
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the development server:
   ```bash
   pnpm run dev
   ```

Open [https://localhost:3000](https://localhost:3000) in your browser to see the result. SSL must be enabled to use certain browser APIs that won't run on unencrypted connections.

## Translation

Translation in this project happens on two fronts: content and UI.

### UI translation

This is handled using `next-intl`. It allows you to manage translations and provides a simple API for switching between languages.

Note that the app currently uses a language prefix for all routes, and all application code resides within a localization folder. This approach is compatible with our static build strategy.

Feel free to contribute translations in the `apps/web/src/i18n/messages` folder. Translations are in JSON format; simply create a new file with the language code (e.g., `en.json`, `hu.json`, etc.) and add the keys. Remember to update the relevant configurations.

Planned UI translation support (potentially using low-quality translation software for added annoyance):

- [x] English
- [ ] Hungarian
- [ ] Mandarin
- [ ] Spanish
- [ ] Arabic
- [ ] Hindi
- [ ] Portuguese
- [ ] Russian
- [ ] French
- [ ] German
- [ ] Japanese

### Content translation

Content translation is managed via the `packages/content-api` package. Currently, all content, images, and metadata are bundled within this package.

**For detailed information, please see `packages/content-api/README.md`**

## Deployment

Pull Requests are automatically published to Vercel as previews, and the `main` branch is deployed to our primary domain with every new commit.

## Contribution

This project is open for contributions! If you have ideas, don’t hesitate — **start your PR today! The world needs you, ACT NOW!**

## Support

Visit [onet.dev](https://onet.dev) or drop me an email.

### 3rd party credits

- **AI disclaimer**: Article covers and content are generated via AI (DALL-E, ChatGPT) and curated by humans.
- **Notification sound for "live chat"**: [akx/Notifications](https://github.com/akx/Notifications) under license CC0.
- **Cookie jar animation on donation page**: [Saving the Money](https://lottiefiles.com/free-animation/saving-the-money-C9plsMchxQ) on LottieFiles.
- **Icons**: [FontAwesome](https://fontawesome.com).
- **Lava photo on "Hot Things"** (by Tanya Grypachevskaya): [Unsplash](https://unsplash.com/photos/80x3QULJDN4).

---

🧪 May your UX be terrible, and your JS bundles large.

With love,
— The Most Annoying Website team ❤️‍🔥
