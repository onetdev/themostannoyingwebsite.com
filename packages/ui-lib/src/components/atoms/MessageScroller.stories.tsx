import type { Meta, StoryObj } from '@storybook/nextjs';

import { Bubble, BubbleContent } from './Bubble';
import { Marker, MarkerContent } from './Marker';
import { Message, MessageContent, MessageFooter } from './Message';
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from './MessageScroller';

const meta = {
  title: 'Atoms/MessageScroller',
  component: MessageScroller,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Shadcn chat MessageScroller primitive. Owns streaming follow, anchoring and jump-to-latest. Compose with `Message`, `Bubble` and `Marker`. See [official documentation](https://ui.shadcn.com/docs/components/message-scroller).',
      },
    },
  },
} satisfies Meta<typeof MessageScroller>;

export default meta;
type Story = StoryObj<typeof meta>;

const conversation: { align: 'start' | 'end'; text: string; time: string }[] = [
  {
    align: 'start',
    text: 'Hello! I am a chat bubble. 👋',
    time: '2 minutes ago',
  },
  { align: 'end', text: 'Hi, are you a real human?', time: '1 minute ago' },
  { align: 'start', text: 'Absolutely. 100% huuman. 🤓', time: '1 minute ago' },
  { align: 'end', text: 'I have my doubts…', time: 'just now' },
];

export const Chat: Story = {
  render: () => (
    <div className="border-border bg-card h-80 w-80 overflow-hidden rounded-lg border">
      <MessageScrollerProvider defaultScrollPosition="end" autoScroll>
        <MessageScroller className="h-full">
          <MessageScrollerViewport className="flex flex-col px-4 py-3">
            <MessageScrollerContent className="gap-2">
              {conversation.map((message, index) => (
                <MessageScrollerItem key={index}>
                  <Message align={message.align}>
                    <MessageContent>
                      <Bubble
                        variant={
                          message.align === 'end' ? 'secondary' : 'default'
                        }
                        align={message.align}
                      >
                        <BubbleContent>{message.text}</BubbleContent>
                      </Bubble>
                      <MessageFooter>{message.time}</MessageFooter>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              ))}
              <MessageScrollerItem>
                <Marker variant="separator">
                  <MarkerContent>Agent is typing…</MarkerContent>
                </Marker>
              </MessageScrollerItem>
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
    </div>
  ),
};
