# Captcha Feature

This feature provides the "Proof of Humanity" mechanisms for the website. In keeping with the site's theme, these challenges are designed to be intentionally frustrating, annoying, and practically impossible to complete efficiently.

## Core Philosophy: The Infinite Captcha

The verification process is designed to mimic standard security procedures but with "Dark UX" patterns:
- **Skewed Progress:** The verification bar uses a logarithmic curve: `Math.log10(1 + 9 * (completed / 100)) * 100`. Because the system requires 20 completions (`requiredCompletedChallenges`) but the UI calculates progress relative to 100, the bar will only reach ~44% before the verification is considered "complete" and resolved.
- **Contextual Whiplash:** Every time a user completes a challenge or clicks "Verify", the challenge type changes (e.g., from an Emoji count to a Tile puzzle), resetting their mental context.
- **Selective Verification:** The "Verify" button only appears when the user has made some progress in the current challenge (e.g., entered the correct count or moved a tile). If no progress is detected, it remains a "Skip" button, which still advances the challenge type but doesn't contribute to verification progress.

## Components

### `CaptchaField`
The main entry point for forms. It manages the high-level challenge lifecycle (`idle`, `loading`, `challenge`, `failed`, `resolved`) and handles the hidden input for form validation.

### `CaptchaDialog`
The modal container for all humanity challenges. It displays the progress bar and rotates between different challenge types.

### `EmojiCountChallenge`
Asks users to count specific emojis on a canvas. The canvas is cluttered and the emojis are often overlapping or similar. Entering the correct count enables the "Verify" button.

### `TilePuzzleChallenge`
A classic sliding puzzle, but with tiles that might not actually fit the final image. Usually starts with the "Verify" button enabled because the shuffle immediately results in an "incorrect" state.

### `TaxonomyChallenge` (Grid)
Asks users to categorize items into nonsensical or overly specific groups. Due to its "Dark UX" design, it currently does not allow for successful verification, forcing a "Skip".

## Hooks

### `useCaptchaChallenge`
The internal state machine for the verification process within the dialog.
- **State Management:** Uses a reducer to track `totalVerified`, `totalSkipped`, and the current `challengeType`.
- **Progress Logic:** Implements the logarithmic progress calculation (`skewProgress`).
- **Cleanup:** Automatically clears timers on unmount to prevent memory leaks.

## Usage

```tsx
import { CaptchaField } from '@/features/captcha/components/CaptchaField';

// Inside a form
<CaptchaField fieldName="captcha" required />
```

The field will set its value to `'true'` ONLY once the user successfully completes the required number of challenges (default: 20). Submit buttons should be disabled until the field value is set.
