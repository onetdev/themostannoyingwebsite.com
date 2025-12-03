# Chat Bubble Module

Interactive fake chat bubble with automated bot responses and notification features.

## Features

- **Floating Chat Button** - Fixed position chat bubble with unread badge counter
- **Conversation History** - Persistent chat history with timestamps
- **Automated Bot Messages** - Random bot responses that appear when chat is backgrounded
- **Desktop Notifications** - Browser notifications for new messages
- **Sound Effects** - Audio notifications for incoming messages
- **User Interaction** - Message input form for user responses

## Bot Behavior

- Sends initial greeting message on mount
- Waits 3 seconds after user interaction before sending random messages
- Only triggers new messages when chat is closed
- Cycles through translated message variants
- Falls back to default message when variants exhausted

## Usage

```typescript
// Use the complete chat bubble experience
import { ChatBubbleHost } from '@/modules/chat-bubble';

<ChatBubbleHost />

// Use the chat history hook directly
import { useChatBubbleHistory } from '@/modules/chat-bubble';

function CustomChat() {
  const {
    history,
    badgeCounter,
    isForeground,
    setForeground,
    add
  } = useChatBubbleHistory();

  return (
    <div>
      <button onClick={() => setForeground(true)}>
        Open Chat ({badgeCounter} unread)
      </button>
      {/* Render custom chat UI */}
    </div>
  );
}

// Access history item types
import { HistoryItem, HistoryItemOwner } from '@/modules/chat-bubble';

const message: HistoryItem = {
  text: "Hello!",
  owner: "bot",
  time: new Date()
};
```

## Configuration

Bot messages are configured via translation files under the `chatBubble.messageVariants` namespace. Sound effects and notifications respect user preference settings.
