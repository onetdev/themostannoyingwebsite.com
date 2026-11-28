/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import type { Comment } from '../../schemas';
import { ShortsCommentsPanel } from './ShortsCommentsPanel';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

jest.mock('../CommentSection/LoginRequiredModal', () => ({
  LoginRequiredModal: ({ show }: { show: boolean }) =>
    show ? <div data-testid="login-required" /> : null,
}));

const comment = (id: string, content: string, replies: Comment[] = []) => ({
  id,
  name: 'Tester',
  content,
  time: Date.now(),
  likes: 0,
  replies,
});

const comments: Comment[] = [
  comment('root', 'Root comment', [
    comment('reply', 'Nested reply'),
    comment('reply-2', 'Second reply'),
  ]),
  comment('root-2', 'Another root'),
];

describe('ShortsCommentsPanel', () => {
  it('renders the total count and expands the first reply level', () => {
    render(<ShortsCommentsPanel comments={comments} onClose={jest.fn()} />);

    expect(screen.getByTestId('shorts-comments-count')).toHaveTextContent(
      'comments.count',
    );
    expect(screen.getByText('Root comment')).toBeVisible();
    expect(screen.getByText('Nested reply')).toBeVisible();
    expect(screen.getByText('Second reply')).toBeVisible();

    const replies = document.querySelectorAll('[data-depth="1"]');
    expect(replies).toHaveLength(2);
  });

  it('shows the empty state when there are no comments', () => {
    render(<ShortsCommentsPanel comments={[]} onClose={jest.fn()} />);

    expect(screen.getByText('comments.empty')).toBeVisible();
  });

  it('opens the login gate when the composer is submitted', () => {
    render(<ShortsCommentsPanel comments={comments} onClose={jest.fn()} />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Nice clip' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'common.action.send' }));

    expect(screen.getByTestId('login-required')).toBeInTheDocument();
  });

  it('does not open the login gate for an empty composer', () => {
    render(<ShortsCommentsPanel comments={comments} onClose={jest.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: 'common.action.send' }));

    expect(screen.queryByTestId('login-required')).not.toBeInTheDocument();
  });

  it('closes through the header control', () => {
    const onClose = jest.fn();
    render(<ShortsCommentsPanel comments={comments} onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: 'comments.close' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
