# Share Feature

Provides the reusable share affordance used across the site.

## Key Highlights

- **ShareButton**: Triggers the platform share sheet when `navigator.share` is
  available, otherwise falls back to the global share modal. Dismissing the
  native sheet (`AbortError`) deliberately does not force the fallback modal.
- **useShareAction**: The share logic extracted as a hook so any surface (e.g.
  the donation hero's "Share instead" button) gets the same native-first
  behaviour without re-implementing it.
- **GlobalShareModal**: The modal fallback lives in the public route group
  (`src/app/[locale]/(public)/_components/GlobalShareModal.tsx`) and is opened
  through the runtime store's `showShareModal`.

## Translations

Share labels live in the global `common` namespace
(`common.action.share`); this feature has no dedicated `i18n/en.ts` file. See
`adr/0028-english-translation-reference-sync.md`.
