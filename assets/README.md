## Asset source files

This folder contains some of the assets used in the project.

### Where do we use exports?

- `appicon.af` -> `apps/web/public/assets/appicon.png`: Application ison, indirectly also being used for favicon and splash screen through manifest generator.
- `banner-github.af` -> `apps/web/public/assets/banner-github.png`: Optimized banner for GitHub
- `banner-default.af` -> `apps/web/public/assets/banner-default.png`: Optimized banner for Facebook
- `logo-bouncing.af` -> `apps/web/src/features/obstructor/components/Screensaver/BouncingLogoScreensaver/BouncyLogo.tsx`: Exported as SVG but used as JSX with multi color props.
- `merch-sticker-1.af` -> This project file doesn't have any export in the project but it is being used for an offline project.

### How to open asset project files?

We are using Affinity (by Canva) for our assets, free version is more than enough: https://www.affinity.studio/

/ Thanks for being an alternative to Adobe! /
