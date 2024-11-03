export type HistoryItemOwner = 'user' | 'bot';
export type HistoryItem = {
  text: string;
  owner: HistoryItemOwner;
  time: Date;
};
