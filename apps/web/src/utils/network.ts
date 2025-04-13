export const fetchWithTimeout = (
  url: string,
  options: RequestInit & { timeout?: number } = {},
): Promise<Response> => {
  const controller = new AbortController();
  const signal = controller.signal;

  const timeoutPromise = new Promise<never>((_, reject) => {
    const id = setTimeout(() => {
      controller.abort();
      reject(new Error(`Fetch request timed out after ${options.timeout}ms`));
    }, options.timeout ?? 5000);

    signal.addEventListener('abort', () => clearTimeout(id));
  });

  return Promise.race([fetch(url, { ...options, signal }), timeoutPromise]);
};
