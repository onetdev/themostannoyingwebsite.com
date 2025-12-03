# Chat Bubble Module

Interactive chat bubble interface with history, notifications, and real-time messaging experience.

## Overview

This module implements a chat bubble feature that provides:

- **Chat Bubble Host** - Fixed floating chat button with badge counter
- **Chat History** - Persistent conversation history with timestamps
- **Bot Messages** - Automated bot responses with random message variants
- **Notifications** - Desktop notifications and sound effects for new messages
- **User Interaction** - Message input form and conversation management

## Structure

The module follows clean architecture principles with the following layers:

### Domain Layer (`domain/`)

Core business entities and types:

- **Entities**
  - `types.ts` - Domain types for chat history items and ownership (user/bot)
    - `HistoryItem` - Message entity with text, owner, and timestamp
    - `HistoryItemOwner` - Union type for message ownership ('user' | 'bot')

### Application Layer (`application/`)

Business logic, hooks, and use cases:

- **Hooks**
  - `useChatBubbleHistory.ts` - Main chat bubble state management hook
    - History management
    - Badge counter logic
    - Random bot message generation
    - Sound and notification integration
    - Foreground/background state tracking

### Infrastructure Layer (`infrastructure/`)

Implementation details for data access and external services (ready for chat API implementations).

### Presentation Layer (`presentation/`)

UI components and host:

- **Components**
  - `MessageBubble.tsx` - Individual message display with timestamp
  - `MessageForm.tsx` - Message input form with submit button
  - `HistoryOverlay.tsx` - Full chat history overlay with scrolling

- **Host**
  - `ChatBubbleHost.tsx` - Main floating chat bubble with badge and overlay management

## Features

### Chat Bubble Host

- Fixed position floating button (bottom-left)
- Badge counter for unread messages
- Click outside to close overlay
- Smooth open/close transitions
- Responsive design (mobile/desktop)

### History Management

- Persistent conversation history
- Timestamp display with relative time (via react-timeago)
- Auto-scroll to latest message
- Smart timestamp grouping (shows time when messages are 5+ minutes apart or different owners)

### Bot Behavior

- Initial greeting message on mount
- Random bot messages from translation variants
- 3-second delay before sending new bot message
- Fallback message when all variants used
- Only triggers when user has interacted and chat is backgrounded

### Notifications

- Desktop notifications for new bot messages (when chat is closed)
- Sound effects (notification chord) for new messages
- Respects user sound preferences
- Badge counter increments with each new message

### User Interaction

- Message input form with validation
- Send button with icon
- Form reset after message sent
- Real-time chat experience

### Configuration

Bot messages are configured via translation files:

```json
{
  "chatBubble": {
    "messageInitial": "Hello! How can I help you?",
    "messageFallback": "I'm here if you need anything!",
    "messageVariants": {
      "variant1": "Still here?",
      "variant2": "Need any help?",
      "variant3": "Let me know if you have questions!"
    }
  }
}
```
