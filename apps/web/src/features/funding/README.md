# Funding Feature

Manages the site's donation information and funneling user traffic towards various support mechanisms.

## Key Highlights

- **DonationPage**: A centralized layout pairing a borderless balance hero and a compact support grid on the left with the FAQ (backed by a faint jar animation) on the right, followed by a before/after comparison sample and the "impact in numbers" charts.
- **BeforeAfterSlider**: Standalone draggable comparison component (`inset()` clip over two layers) placed above the impact stats; imagery is passed in so it can be swapped without touching the component.
- **BeggarBanner**: A prominent, non-dismissible alert at the top of the site that encourages users to donate. Its visibility is often linked to the first 10 days of each month to simulate "real-world" funding urgency.
- **DonationService**: An injectable service that provides calculated estimates for the project's financial status and determines if the `BeggarBanner` should be displayed.
- **Crypto Donations**: `SupportOptions` lists classic and crypto methods; the BTC/ETH buttons reveal a dynamically generated QR code, network and copy-to-clipboard address inside a `Popover` (see `docs/shadcn-adoption-log.md`, BEH-21).
- **Neon Arrows**: A decorative `NeonArrow` SVG (theme-primary drop-shadow glow, reduced-motion aware) points from the balance hero at the support buttons.

## Service Details

- `isBannerActive()`: Returns a boolean indicating if the beggar banner should currently be shown.
- `getCostEstimation()`: Provides the estimated monthly hosting and maintenance costs of the platform.

## Out of Scope

- **Real-Time Payment Integration**: Clicking "Donate" might redirect to third-party sites but does not handle payments directly within the application.
- **Live Transaction Tracking**: All financial data shown is estimated or manually updated, not pulled from a live blockchain or payment processor API.
