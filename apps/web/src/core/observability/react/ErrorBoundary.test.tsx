/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import * as Sentry from '@sentry/nextjs';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { ErrorBoundary, SilentErrorBoundary } from './ErrorBoundary';

jest.mock('@sentry/nextjs', () => ({
  captureException: jest.fn(),
}));

function ProblemChild({ shouldThrow }: { shouldThrow?: boolean }) {
  if (shouldThrow) {
    throw new Error('Test exploding error');
  }
  return <div>Safe child content</div>;
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders children normally when no error occurs', () => {
    render(
      <ErrorBoundary name="test-boundary">
        <ProblemChild shouldThrow={false} />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Safe child content')).toBeInTheDocument();
    expect(Sentry.captureException).not.toHaveBeenCalled();
  });

  it('captures error in Sentry and renders fallback node when error occurs', () => {
    render(
      <ErrorBoundary
        name="test-boundary"
        fallback={<div>Fallback error message</div>}
      >
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Fallback error message')).toBeInTheDocument();
    expect(screen.queryByText('Safe child content')).not.toBeInTheDocument();
    expect(Sentry.captureException).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        extra: expect.objectContaining({
          boundaryName: 'test-boundary',
        }),
      }),
    );
  });

  it('supports render function fallback and reset', () => {
    function ResetWrapper() {
      const [shouldThrow, setShouldThrow] = React.useState(true);
      return (
        <ErrorBoundary
          name="retry-boundary"
          fallback={({ error, reset }) => (
            <div>
              <span>Error: {error.message}</span>
              <button
                type="button"
                onClick={() => {
                  setShouldThrow(false);
                  reset();
                }}
              >
                Retry
              </button>
            </div>
          )}
        >
          <ProblemChild shouldThrow={shouldThrow} />
        </ErrorBoundary>
      );
    }

    render(<ResetWrapper />);

    expect(screen.getByText('Error: Test exploding error')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Retry'));

    expect(screen.getByText('Safe child content')).toBeInTheDocument();
  });

  it('renders null when fallback is not provided and error occurs', () => {
    const { container } = render(
      <ErrorBoundary name="no-fallback-test">
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(container).toBeEmptyDOMElement();
    expect(Sentry.captureException).toHaveBeenCalled();
  });

  it('SilentErrorBoundary suppresses errors and returns null while capturing in Sentry', () => {
    const { container } = render(
      <SilentErrorBoundary name="silent-test">
        <ProblemChild shouldThrow={true} />
      </SilentErrorBoundary>,
    );

    expect(container).toBeEmptyDOMElement();
    expect(Sentry.captureException).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        extra: expect.objectContaining({
          boundaryName: 'silent-test',
        }),
      }),
    );
  });
});
