# Support Feature

Implements intentionally difficult, high-friction, and misleading "help" and support systems.

## Key Highlights

- **ContactPage**: A specialized layout that displays fake contact details and funnels users toward a frustrating contact form.
- **ContactForm**: A form that, instead of submitting data to a backend, opens a new browser tab with a `mailto:*` link. The form fields are designed to be confusing and the submission process to be prone to simulated errors.
- **ChatBubble**: A persistent UI element that mimics a customer support chat interface with "Dark UX" behaviors:
  - Automatically appends "new" bot messages after a short delay.
  - Generates notifications and sounds to distract the user.
  - Deterministically generates chat history based on current session parameters.
- **useChatBubbleHistory**: Custom hook that manages the simulated chat state, including history, unread badge counters, and automated bot responses.

## Interaction Patterns

- **Notification Spams**: The chat bubble will generate browser notifications and sound effects to disrupt the user's experience.
- **Tab Hijacking**: Opening the contact form might redirect the user or open multiple tabs.

## Out of Scope

- **Real Customer Support Integration**: Does not connect to Zendesk, Intercom, or any other support platform.
- **Real AI Chatbot**: The "AI" chatbot uses pre-defined or randomized templates and is not capable of understanding or answering real questions.
- **Support Ticketing**: No tickets are actually created or tracked.
