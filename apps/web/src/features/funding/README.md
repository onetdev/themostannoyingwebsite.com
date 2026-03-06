# Funding Feature

Manages the site's donation information and funneling user traffic towards various support mechanisms.

## Key Highlights

- **DonationPage**: A centralized layout that displays current project goals, cost/donation balance, and links to various crypto and donation platforms.
- **BeggarBanner**: A prominent, non-dismissible alert at the top of the site that encourages users to donate. Its visibility is often linked to the first 10 days of each month to simulate "real-world" funding urgency.
- **DonationService**: An injectable service that provides calculated estimates for the project's financial status and determines if the `BeggarBanner` should be displayed.
- **QR Code Generation**: Displays dynamically generated QR codes for multiple cryptocurrency addresses to facilitate easy (simulated) contributions.
- **Crypto Donation Hooks**: Manages the copy-to-clipboard functionality for crypto addresses, often triggering global events for achievements.

## Service Details

- `isBannerActive()`: Returns a boolean indicating if the beggar banner should currently be shown.
- `getCostEstimation()`: Provides the estimated monthly hosting and maintenance costs of the platform.

## Out of Scope

- **Real-Time Payment Integration**: Clicking "Donate" might redirect to third-party sites but does not handle payments directly within the application.
- **Live Transaction Tracking**: All financial data shown is estimated or manually updated, not pulled from a live blockchain or payment processor API.
