import { z } from 'zod';

export const ChatMessageTypeList = ['user', 'bot'] as const;

export const ChatMessageTypeSchema = z.enum(ChatMessageTypeList);

export const ChatMessageSchema = z.object({
  text: z.string(),
  owner: ChatMessageTypeSchema,
  time: z.date(),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;
export type ChatMessageType = (typeof ChatMessageTypeList)[number];
