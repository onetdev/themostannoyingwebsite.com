# Marketing Feature

Displays intrusive advertisements, promotional content, and fake rewards designed with "Dark UX" patterns to mimic the most annoying aspects of modern web advertising.

## Key Highlights

- **DilfPage & Promotion Flaps**: Displays a "donut-finder" promo (`DILF - Donuts I'd Like to Feast On`) as persistent side flaps that attempt to redirect the user away from their current content.
- **FlaimSurveyPage**: A multi-step fake quiz that uses high-pressure tactics (timers, impossible questions) and an animated banner to trick the user into thinking they've won a reward.
- **Newsletter Subscription Loop**: A `NewsletterModal` that pops up based on scroll depth or tab-focus changes. The "Subscribe" and "Cancel" buttons are intentionally shuffled and use deceptive confirmation prompts.
- **Adblocker Detection**: `AdblockerSuspectBar` monitors the presence of ad blockers and displays a massive, red, non-closable banner at the bottom of the screen.
- **Wheel of Fortune**: A "spinning wheel" UI that always results in fake or nonsensical rewards.
- **OneByOnePromotion**: An intrusive, floating advertisement component that appears on random articles.

## Interaction Patterns

- **Button Shuffling**: The confirmation dialog for the newsletter shuffles the position of "Confirm" and "Cancel" buttons randomly.
- **Urgency Simulation**: Uses fake timers and "limited-time" labels to create a false sense of scarcity.

## Out of Scope

- **Working Newsletter Storage**: No email addresses are actually stored or added to a mailing list.
- **Real Backend Integration**: All marketing flows are entirely client-side and contained within the feature logic.
- **Genuine Rewards**: No real prizes, discounts, or downloads are provided.
