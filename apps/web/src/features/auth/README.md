# Auth Feature

Provides the UI and logic for user authentication-related pages. This feature is a "fake facade" designed with "Dark UX" patterns, making it intentionally impossible to complete any authentication flow.

## Key Highlights

- **Standard Auth Pages**: Includes `LoginPage`, `SignupPage`, and `PasswordReminderPage`. These pages use complex forms that will always fail or redirect users in frustrating ways.
- **AdminAuthPage**: A specialized, terminal-style interface accessible via the `/admin` route. It requires a fake login and password (`admin`/`admin`) to grant access to simulated administrative functions.
- **Zod-Powered Forms**: All forms are implemented with `react-hook-form` and `zod` for validation, but the validation rules are often nonsensical or overly restrictive to prevent successful submission.
- **Auth Hooks**: Features custom hooks like `useLoginForm`, `useSignupForm`, and `usePasswordReminderForm` that manage the simulated submission lifecycle and generate frustrating error messages.
- **In-Memory Logic**: Any "state" or simulated services are purely in-memory and do not persist across page reloads.

## Pages

- `/login`: Standard login form with unavoidable errors.
- `/signup`: Multi-field registration form with impossible validation.
- `/password-reminder`: Form that pretends to send reset links but instead redirects or fails.
- `/admin`: Terminal interface for "administrative access."

## Out of Scope

- **Real Session Management**: There are no actual session cookies, tokens, or JWTs.
- **Backend Communication**: No data is sent to a server; all submissions are handled locally by mocked services.
- **Permission Guards**: Access control is simulated and can be bypassed by direct URL navigation.
