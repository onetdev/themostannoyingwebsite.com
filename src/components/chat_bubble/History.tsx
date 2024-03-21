import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import ReactTimeAgo from 'react-timeago';
import { styled, css, keyframes } from 'styled-components';

import { cssVars } from '@/styles/theme';

export type HistoryItem = {
  text: string;
  isUser: boolean;
  time: Date;
};

type Props = {
  history: HistoryItem[];
  onUserMessage: (message: string) => void;
  onClose: () => void;
};

const dotDotDotAnim = keyframes`
  0% { content: '.'; }
  25% { content: '..'; }
  50% { content: '...'; }
  75% { content: ''; }
  100% { content: '.'; }
`;
const Wrap = styled.div`
  background: ${cssVars.color.surface};
  width: min(400px, 70vw);
  border-radius: ${cssVars.spacing.gap};
  border: 1px solid ${cssVars.color.secondary};
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${cssVars.spacing.gap};
  padding-left: ${cssVars.spacing.gap2x};
  box-shadow: inset 0 -1px 0 0 ${cssVars.color.primary};
  h4 {
    margin: 0;
    font-size: ${cssVars.fontSize.large};
    font-weight: bold;
  }
`;
const CloseIcon = styled.div`
  cursor: pointer;
`;
const HistoryPager = styled.div`
  max-height: min(300px, 50vh);
  overflow: auto;
  padding: ${cssVars.spacing.gap} ${cssVars.spacing.gap2x};
`;
const BotMessage = css`
  background: ${cssVars.color.primary};
  color: ${cssVars.color.onPrimary};
  margin-right: 15px;
`;
const UsserMessage = css`
  background: ${cssVars.color.secondary};
  color: ${cssVars.color.onSecondary};
  margin-left: 15px;
`;

const Message = styled.div<{ $isUser: boolean }>`
  position: relative;
  padding: 10px;
  border-radius: 10px;
  margin: 10px 0 25px 0;
  ${({ $isUser: isUser }) => (isUser ? UsserMessage : BotMessage)}
`;
const MessageTime = styled.small`
  position: absolute;
  bottom: -18px;
  font-size: ${cssVars.fontSize.small};
  color: ${cssVars.color.onBackground};
  opacity: 0.5;
`;
const BotIsTyping = styled.div`
  font-size: ${cssVars.fontSize.normal};
  font-style: italic;
  &:after {
    content: '';
    animation: ${dotDotDotAnim} 2s infinite;
  }
`;
const Form = styled.form`
  display: flex;
  justify-content: space-between;
  box-shadow: inset 0 1px 0 0 ${cssVars.color.primary};
  padding: ${cssVars.spacing.gap};
  padding-left: ${cssVars.spacing.gap2x};
`;
const Input = styled.input`
  background: ${cssVars.color.surface};
  color: ${cssVars.color.onSurface};
  border: 1px solid ${cssVars.color.tertiary};
  padding: ${cssVars.spacing.gap};
  flex-grow: 1;
  border-radius: 0;
`;
const Submit = styled.button`
  background: ${cssVars.color.primary};
  color: ${cssVars.color.onPrimary};
  border: none;
  border-radius: 0 10px 10px 0;
  padding-right: 10px;
`;

const History = ({ onUserMessage, history, onClose }: Props) => {
  const [showTyping, setShowTyping] = useState(true);
  const userForm = useRef<HTMLFormElement>(null);
  const userMessage = useRef<HTMLInputElement>(null);
  const pagerRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const message = userMessage.current?.value;
    if (message) {
      onUserMessage(message);
      userForm.current?.reset();
    }
  };

  useEffect(() => {
    setShowTyping(history[history.length - 1]?.isUser ?? false);
  }, [history]);

  // We don't care about the current scroll position, this will force the user
  // to always see the most recent messages.
  useEffect(() => {
    (
      pagerRef.current?.lastChild as HTMLSpanElement | undefined
    )?.scrollIntoView({ behavior: 'smooth' });
  }, [history, showTyping]);

  return (
    <Wrap>
      <Header>
        <h4>
          Chat with a &quot;100% real human&quot;{' '}
          <abbr title="Disclaimer: Actually, this is a bot that almost feels like a real human (not a smart one)">
            *
          </abbr>
        </h4>
        <CloseIcon onClick={() => onClose()}>
          <FontAwesomeIcon icon={['fas', 'times']} />
        </CloseIcon>
      </Header>
      <HistoryPager ref={pagerRef}>
        {history.length > 0 &&
          history
            .sort((a, b) => a.time.getTime() - b.time.getTime())
            .map((item, index) => (
              <Message key={index} $isUser={item.isUser}>
                {item.text}
                <br />
                <MessageTime>
                  <ReactTimeAgo date={item.time} />
                </MessageTime>
              </Message>
            ))}
        {showTyping && <BotIsTyping>Is typing</BotIsTyping>}
      </HistoryPager>
      <Form onSubmit={handleFormSubmit} ref={userForm}>
        <Input
          name="message"
          title="Your message"
          placeholder="Type here..."
          ref={userMessage}
        />
        <Submit type="submit">
          <FontAwesomeIcon icon={['fas', 'paper-plane']} />
        </Submit>
      </Form>
    </Wrap>
  );
};

export default History;
