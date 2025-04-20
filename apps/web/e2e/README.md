# A little e2e guide for web

## What is being covered?

### 🧪 1. Smoke Tests

> “Does the app load without crashing?”

- Purpose: Verify that the critical routes/pages/components render and function at a high level.
- Examples:
  - Can I load the home page?
  - Does the login page show up?
  - Does the dashboard load for a logged-in user?

🟢 Fast, surface-level. First line of defense.

### 🔍 2. Sanity Tests

> “Does this specific feature work in isolation?”

- Similar to smoke tests, but focused on a specific feature or module.
- Less shallow than smoke tests, but still not exhaustive.
- Examples:
  - Can I open the modal and close it again?
  - Is the main navigation bar functional?

🔧 Often used after a deployment or build.

### ⚙️ 3. Happy Path Tests

> “Does the feature work under normal conditions?”

- Simulates typical user behavior under expected conditions.
- Examples:
  - Sign up > verify email > login > update profile.
  - Add item to cart > checkout > see confirmation page.

✅ These should pass most of the time unless there’s a major bug.

### ❌ 4. Negative Path Tests (Error handling)

> “What happens when users do the wrong thing?”

- Tests unusual or invalid scenarios to ensure graceful error handling.
- Examples:
  - Try to submit a form with missing required fields.
  - Navigate to a route that doesn’t exist.
  - Upload an invalid file format.

🧯Important for robustness.

### 🔁 5. Regression Tests

> “Did we break anything old with this new code?”

- Re-run previously passing tests after a new release or feature merge.
- Can overlap with smoke/happy path/negative tests.

♻️ Usually automated in CI.

### 🔐 6. Security & Auth Flow Tests

> “Is user access restricted and protected correctly?”

- Test that:
- Authenticated pages are inaccessible without login.
- Roles (admin/user) get the right access.
- Tokens expire or refresh as expected.

🛡️ Often overlooked but critical.

### 🔄 7. Workflow / Scenario Tests

> “Can the user complete an entire business process?”

- End-to-end multi-step flows.
- Examples:
  - A full booking flow.
  - A multi-page checkout with payment.
  - Invite → accept invite → create content → share.

🎯 High value but slower and more brittle.

## What is not being tested? (might change in the future)

### 🧱 Visual Regression Tests (Optional but E2E-adjacent)

- Tools like Percy or Playwright’s screenshot diffs.
- Checks for unintended visual UI changes.
- Not logic-based, but useful for spotting layout/UI issues.
