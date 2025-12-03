# Auth Module

Fake authentication system with intentionally annoying form interactions and user experience patterns.

## Purpose

This module is **not intended to be functional**. Its goal is to provide weird form interactions, validation quirks, and frustrating auth flows as part of the annoying website experience.

## Features

- **Fake Authentication Forms**: Login, signup, and password reminder forms with bizarre validation rules
- **Emoji Captcha**: Unconventional captcha using emoji selection
- **Form Field Quirks**: Intentionally confusing field validations and error messages
- **Fake Repository**: Mock authentication that doesn't actually authenticate
- **Profile Pages**: Non-functional user profile and account management

## Components

### Forms
- `LoginForm` - Login form with fake authentication
- `SignupForm` - Registration form with extensive annoying fields
- Password reminder form with unusual validation

### Form Fields
Complete set of form fields with quirky behavior:
- Email, username, password fields
- Name fields (first, last, nickname)
- Date of birth, gender, country selectors
- Phone number input
- Privacy policy and newsletter consent checkboxes

### Pages
- `LoginPage` - Standalone login page
- `SignupPage` - Standalone registration page
- Profile pages with fake user data

## Usage

```typescript
import { LoginForm, SignupForm } from '@/modules/auth';

// Use login form
<LoginForm onSubmit={handleFakeLogin} />

// Use signup form with all annoying fields
<SignupForm onComplete={handleFakeSignup} />

// Individual form fields
import { EmailField, PasswordCreateField } from '@/modules/auth';
<EmailField {...register('email')} />
```

## Integration

The module uses a fake authentication repository that simulates auth operations without actual backend integration. This allows for testing form interactions and user flows without real authentication.
