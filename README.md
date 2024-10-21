# The Most Annoying Website

The main idea is to gather the most annoying features of modern websites in one place, but on steroids. We refer to these irritating elements as “experiences.” The entire website is a fake facade; no feature functions as it would in a normal scenario.

## Plans for project (_in no particular order_)

**Important**: *To avoid ad blockers, this repo uses the word “gift” instead of terms resembling ad-related content (e.g., promotion, advertisement).*

<details>
  <summary>TODO / Planned</summary>

  - [ ] Newsletter modal that appears when the user leaves the screen or scrolls down a bit
  - [ ] Request for location permission (don’t worry, the website won’t use your location)
  - [ ] Sticky video player that obscures page visibility (with audio)
  - [ ] Create a captcha where you need to select all the images with a car on it but none of the images have a car on them and captcha fails
  - [ ] Low-quality images
  - [ ] Age verification on certain images
  - [ ] Move the articles outside of this repo
</details>

<details>
  <summary>Completed</summary>

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
  <summary>Bit of a stretch</summary>

  - [ ] Design (even though the site is fine with a bad design)
  - [ ] Funny, silly content (Part 2)
  - [ ] Dead pixel patch
  - [ ] Randomly loading images while scrolling (causing layout shifting)
</details>

## Contribution

This project is open for contributions! If you have ideas to add, don’t hesitate — **start your PR today, the world needs you, ACT NOW!**

### Framework

The stack is the usual: Next.JS + TypeScript + TailwindCSS. If you’re not familiar with these but still want to add your own experiences or tweaks, you can find excellent documentation here:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs) - learn about TailwindCSS features and API.

### Local development

First, run the development server:

```bash
pnpm run dev
```

Open [https://localhost:3000](https://localhost:3000) in your browser to see the result. SSL must be enabled to use certain browser APIs that won’t run on unencrypted connections.

## Translation

Fortunately, Next.JS comes with great [i18n support](https://nextjs.org/docs/pages/building-your-application/routing/internationalization) out of the box. We use simple path-based routing for translations, so if you want to add a new language, just create a folder under `public/locales` with the language code (eg.: `en`, `hu`, `de`, etc.) and add the files you want to translate. Please use `en` as a reference for keys and values.

Keep in mind that translations are currently low on the priority list, the goal is only to have it prepared for the future.

**For content translation, see `public/assets/articles/README.MD`**

## Deployment

PRs are automatically published to Vercel as previews (you can find preview URLs in PRs), and the `main` branch is deployed to our main domain with every new commit.

## Support

Pay a visit to https://onetdev.com, drop me an email.

### 3rd party credits

- AI disclaimer: Article covers and contents are generated via AI (DALLe, ChatGPT), curated by humans.
- Notification sound: https://github.com/akx/Notifications under licence CC0
- Icons: https://fontawesome.com
- Lava photo (Tanya Grypachevskaya): https://unsplash.com/photos/80x3QULJDN4
- Background ad photo (Erik Mclean): https://unsplash.com/photos/ZRns2R5azu0
- Article cover placeholder (Syed Ahmad): https://unsplash.com/photos/yXTr6XeJDV8
