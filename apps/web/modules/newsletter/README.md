# Newsletter Module

Newsletter subscription functionality with an interactive modal experience.

## Overview

This module implements newsletter subscription features:

- **Newsletter Modal** - Interactive modal with dynamic confirmation buttons
- **Form Management** - Email validation and form handling
- **Experience Triggers** - Scroll distance and document visibility triggers

## Structure

The module follows clean architecture principles with the following layers:

### Domain Layer (`domain/`)

Core business entities and repository interfaces (ready for future newsletter entities).

### Application Layer (`application/`)

Business logic, forms, and hooks:

- **Forms**
  - `newsletter-form.schema.ts` - Zod schema for newsletter form validation
  - `useNewsletterForm.ts` - React Hook Form integration for newsletter subscription

### Infrastructure Layer (`infrastructure/`)

Implementation details for data access and external services (ready for newsletter API implementations).

### Presentation Layer (`presentation/`)

UI components and experience hosts:

- **Components**
  - `NewsletterModal.tsx` - Modal component with dynamic confirmations and flip actions

- **Experience Hosts**
  - `NewsletterModalExperienceHost.tsx` - Manages modal visibility based on scroll and visibility triggers
