# User Feature

Handles user personalization (or depersonalization) settings, notification triggers, and the primary application configuration interface. All functionality is available to guest users as there are no persisted user accounts.

## Key Highlights

- **SettingsPage**: The central hub for configuring "Pain Preferences" and other application behaviors:
  - **Pain Points Configuration**: Toggle and fine-tune specific annoying features (e.g., `searchDelay`, `adblockerSuspectBar`, `deadPixel`).
  - **Runtime & Session View**: Displays technical details about the current session, such as `lastNotifiedAt` or the current `locale`.
  - **Experience Toggles**: Allows for mass-enabling or mass-disabling of entire "annoyance" categories.
  - **Audio & Content Settings**: Global settings for sounds and site content presentation.
- **MyProfilePage**: A static "placeholder" page that informs the user they "aren't supposed to be here," as the site does not maintain real user profiles.
- **Notification Prompting**: Features the `NotificationPromptTrigger` and `NotificationManualModal` components that persistently and intrusively ask users to enable browser notifications.
- **Settings Store**: A persistent Zustand store (`PainPreferencesStore`) that tracks all user settings and persists them in `localStorage`.

## Configuration UI

- `PainPointField`: A specialized checkbox field used in the Settings page to toggle specific annoying features.
- `SettingsLayout`: A multi-tab interface for browsing different setting categories.

Looking for Admin login or terminal access? See the `auth` feature's `/admin` route.

## Out of Scope

- **User Accounts**: No persistent accounts, login-linked settings, or database storage.
- **Synchronization**: Settings are only saved in the local browser and not shared across different devices or browsers.
- **Production Analytics**: The feature does not track user behavior for analytical purposes (handled externally).
