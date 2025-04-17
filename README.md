# The Most Annoying Website

The main idea is to gather the most annoying features of modern websites in one place, but on steroids. We refer to these irritating elements as “experiences.” The entire website is a fake facade; no feature functions as it would in a normal scenario.

## Plans for project (_in no particular order_)

**Important**: *To avoid ad blockers, this repo uses the word “gift” instead of terms resembling ad-related content (e.g., promotion, advertisement).*

<details>
  <summary>TODO / Planned</summary>

  - [ ] **Funny, silly content** - can't stop won't stop, ongoing
  - [ ] Create a captcha where you need to select all the images with a car on it but none of the images have a car on them and captcha fails
  - [ ] Age verification on certain contents
  - [ ] Add holiday related (Halloween, Christmass, Easter) small animated images that follow the mouse cursor

</details>

<details>
  <summary>Completed</summary>

  - [x] Push elements to navigation stack so that when the user tries to navigate back it will stay on the page
  - [x] Add advertisement content to clipboard when copying text
  - [x] Add flashing animation to flaim phone
  - [x] Adblocker detection
  - [x] Prevent rightclick
  - [x] Fake advertisements (free phone)
  - [x] Add disabled mandatory experience checkboxes to settings
  - [x] DILF advertisement and landing page
  - [x] Sticky video player that obscures page visibility
  - [x] Newsletter modal that appears when the user leaves the screen or scrolls down a bit
  - [x] Fake search page that:
    - [x] Silly recommended searches
    - [x] Doesn’t actually work or return any results
  - [x] Fake registration:
    - [x] Difficult age selector
    - [x] Password validator that shows only one error and has absurdly complex rules that contradict each other
  - [x] Fake login with an unsolvable captcha
  - [x] Fake “forgot password” page with a message like “LOL, try harder next time, can’t help you”
  - [x] Multilanguage support
  - [x] Chat bubble with incoming messages and notification sound
  - [x] “Read more” link at the bottom of articles
  - [x] Marquee text
  - [x] Wheel of Fortune-style coupon modal
  - [x] Exit confirmation when trying to leave the page
  - [x] Dynamic title update when the user is on another tab
  - [x] Request for notification permission (don’t worry, the website won’t send any notifications)
  - [x] Dead pixel effect
  - [x] Funny, silly content (Part 1)
</details>

<details>
  <summary>TBD / bit of a stretch</summary>

  - [ ] **Move the articles outside of this repo** - once the size of contents becomes a concern
  - [ ] **Request for location permission** - not quite sure in this one, even though we don't do anything with this data, asking for it might be over the top. Potentially this could trigger once someone does a search.
  - [ ] **Design** - even though the site is fine with a bad design
  - [ ] Dead pixel patch
  - [ ] Randomly loading images while scrolling (causing layout shifting)
  - [ ] Random dark-light mode switching - we could flashbang night owls
</details>

## Project tech

### Frameworks

The stack is the usual: Next.JS + TypeScript + TailwindCSS. If you’re not familiar with these but still want to add your own experiences or tweaks, you can find excellent documentation here:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - learn about TypeScript features and API.
- [TailwindCSS Documentation](https://tailwindcss.com/docs) - learn about TailwindCSS features and API.
- [Turborepo Documentation](https://turbo.build/repo/docs) - learn about Turborepo features and API.
- [pnpm Documentation](https://pnpm.io/) - learn about pnpm features and API.

### Testing

The project mainly uses [Jest](https://jestjs.io/) for unit testing. To run the tests, use the following command:

```bash
pnpm test
```

We also use [Playwright](https://playwright.dev/) for end-to-end testing. To run the tests, use the following command:

```bash
cd apps/web
pnpm test:e2e
```

### Project Structure

This is a Turborepo monorepo. Here's a quick rundown of the main folders:

- `apps/ui-docs`: Documentation for the UI components.
- `apps/web`: The main Next.js frontend.
- `packages/config-eslint`: Shared ESLint config with prettier.
- `packages/config-jest`: Shared Jest preset.
- `packages/config-ts`: Shared TypeScript config.
- `packages/content-api`: Content layer for articles and other dynamic content.
- `packages/ui-lib`: Shared UI components.
- `packages/utils`: Shared utility functions.

### Local development

First, run the development server:

```bash
pnpm run dev
```

Open [https://localhost:3000](https://localhost:3000) in your browser to see the result. SSL must be enabled to use certain browser APIs that won’t run on unencrypted connections.

## Translation

Translation in this project has two fronts. Content and UI translation.

### UI translation

This is being done using next-intl, which is a great library for i18n in Next.js. It allows you to easily manage translations and provides a simple API for switching between languages.

Unfortunately, the library is not perfect and has some limitations. We don't have routes without language prefix and all the app code needs to be in a localisation folder, but since we do static build we are fine.

Feel free to create your own translation in the `apps/web/src/i18n/messages` folder. The translations are in JSON format, so you can easily add your own translations by creating a new file with the language code (e.g., `en.json`, `hu.json`, etc.) and adding the translations there. Don't forget to update configs either.

Planned UI translation support - probably with some poor translation software so that it adds an extra layer of annoyance:

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

The content translation is done using the `packages/content-api` package. The way how content translation is done will change but as for now we have all the content, image and metadata in this package.

**For detailed info please see `packages/content-api/README.MD`**

## Deployment

PRs are automatically published to Vercel as previews (you can find preview URLs in PRs), and the `main` branch is deployed to our main domain with every new commit.

## Contribution

This project is open for contributions! If you have ideas to add, don’t hesitate — **start your PR today, the world needs you, ACT NOW!**

## Support

Pay a visit to https://onet.dev, drop me an email.

### 3rd party credits

- AI disclaimer: Article covers and contents are generated via AI (DALLe, ChatGPT), curated by humans.
- Notification sound: https://github.com/akx/Notifications under licence CC0
- Icons: https://fontawesome.com
- Lava photo (Tanya Grypachevskaya): https://unsplash.com/photos/80x3QULJDN4
- Background ad photo (Erik Mclean): https://unsplash.com/photos/ZRns2R5azu0
- Article cover placeholder (Syed Ahmad): https://unsplash.com/photos/yXTr6XeJDV8

---

🧪 May your UX be terrible, and your JS bundles large.

With love,
— The Most Annoying Website team ❤️‍🔥
