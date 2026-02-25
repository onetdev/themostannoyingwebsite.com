# Auth feature

Provides functionality and UI for user registration, login, and password reset. This feature has no backend because finishing the forms is impossible by design.

## Key highlights

- **LoginPage**, **SignupPage**, **PasswordReminderPage**, and **ProfilePage** components for App Router integration.
- Form schemas and validation using Zod.
- Partial auth service covering support for pages and forms listed above; no real session is being managed here.

## Out of scope

- Any kind of backend integration
- Working login, registration, forgotten password flow
- Client side user state
- Permission checks
