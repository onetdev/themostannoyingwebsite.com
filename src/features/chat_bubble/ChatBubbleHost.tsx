import {
  FunctionComponent,
  MouseEventHandler,
  useCallback,
  useEffect,
} from 'react';

import Icon from '@/components/atoms/Icon';
import HistoryOverlay from '@/features/chat_bubble/components/HistoryOverlay';
import useChatBubbleHistory from '@/features/chat_bubble/hooks/useChatBubbleHistory';

/**
 * This component should start off with an initial message so that we
 * have at least one interaction from the user.
 * Every time the user closes the chat bubble, we should add a new message
 * to the history now with a notification sound.
 */
const ChatBubbleHost: FunctionComponent = () => {
  const state = useChatBubbleHistory();

  const preventClose: MouseEventHandler = (e) => e.stopPropagation();
  const closeHistory = useCallback(() => state.setForeground(false), [state]);
  const toggleHistory: MouseEventHandler<HTMLButtonElement> = () =>
    state.setForeground((prev) => !prev);

  useEffect(() => {
    document.addEventListener('click', closeHistory);
    return () => document.removeEventListener('click', closeHistory);
  }, [closeHistory]);

  return (
    <div
      data-state={state.isForeground ? 'open' : 'closed'}
      className="group fixed bottom-2 left-2 z-20 flex md:bottom-4 md:left-4"
      onClick={preventClose}>
      <button
        className="z-30 flex size-12 cursor-pointer items-center justify-center rounded-full bg-secondary text-2xl text-on-secondary md:size-14"
        onClick={toggleHistory}>
        <Icon icon="commentDots" size="3xl" className="hidden md:block" />
        <Icon icon="commentDots" size="2xl" className="block md:hidden" />
        {state.badgeCounter > 0 && (
          <div className="absolute -right-2 -top-2 z-20 flex size-6 items-center justify-center rounded-full bg-error p-1 text-center text-xs text-on-error md:size-7">
            <span>{state.badgeCounter}</span>
          </div>
        )}
      </button>
      <div className="absolute bottom-10 left-0 z-20 hidden max-h-screen-3/4 w-80 opacity-0 transition-visibility-opacity duration-300 group-data-[state=open]:block group-data-[state=open]:opacity-100 md:bottom-4 md:left-10 md:w-96">
        <HistoryOverlay
          history={state.history}
          onUserMessage={(message) => state.add(message, 'user')}
          onClose={closeHistory}
          open={state.isForeground}
        />
      </div>
    </div>
  );
};

export default ChatBubbleHost;
