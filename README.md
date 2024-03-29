# The most annoying website 

The main idea is to collect all the disgusting features from today's website in one place. On steroids. We call those pesky features "experiments" here.

**Currently planned experiment** (_in no particular order_):

- [x] Chat bubble with incoming messages and notification sound
- [x] "Read more" at the bottom of the article.
- [x] Marquee
- [x] Wheel of fortune coupon modal
- [x] Add confirmation when trying to leave the page
- [x] Update title while the user is on a different tab
- [ ] Age verification on some images
- [ ] Newsletter modal when the user leaves the screen or scrolls down a bit
- [ ] Asking for notification: no worries, the website won't send any notification
- [ ] Asking for location permission: no worries, the website won't use your location
- [ ] Sticky video player obscuring the page visibility. (+audio)
- [ ] Randomly loading images while scrolling.
- [ ] Low Quality images
- [ ] Funny, silly contents (inspired Onion news)

**Stretch goal experiments**:

- [ ] Design: the page does just fine if it's bad looking.

**Important**: In order to avoid adblockers this repo uses "gift" instead of anything that would resemble ad-like content (eg.: promotion, advertisement).

## Contribution

This project is open for contribution! If you have anything to add, do not hesitate and **start your PR today, it's 100% off, ACT NOW!**

### Framework

We are using Next.JS and TypeScript, if you are not familiar with those but still want to add your own experiments and tweaks, you can find great docs on the following sites:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

### Local development

First, run the development server:

```bash
pnpm run dev
```

Open [https://localhost:3000](https://localhost:3000) with your browser to see the result. SSL must be enabled to be able to use some of the browser APIs that won't run on unencrypted connections.

## Translation

Thankfully Next.JS comes with great [i18n support](https://nextjs.org/docs/pages/building-your-application/routing/internationalization) out of the box. We are using simple path based routing for translations, so if you want to add a new language, you just need to create a new folder under `public/locales` with the language code (eg.: `en`, `hu`, `de`, etc.) and create the files you want to translate. Please use `en` as a reference for the keys and values.

Please keep in mind that translations are low on the priority list for now.

## Deployment

PRs are automatically published to Vercel as previews (you can find preview URLs on PRs) and `main` branch will be promoted to our main domain on every single new commits.

## Support

If you are eager to support me, you can throw a few coins into [BuyMeACoffee/onetdev](https://www.buymeacoffee.com/onetdev) and wish something. It might come true!

### 3rd party credits

- Notification sound: https://github.com/akx/Notifications under licence CC0
- Icons: https://fontawesome.com 
- Lava photo (Tanya Grypachevskaya): https://unsplash.com/photos/80x3QULJDN4
- Background ad photo (Erik Mclean): https://unsplash.com/photos/ZRns2R5azu0
- Article cover placeholder (Syed Ahmad): https://unsplash.com/photos/yXTr6XeJDV8
