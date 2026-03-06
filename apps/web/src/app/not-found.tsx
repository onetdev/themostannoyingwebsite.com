'use client';

import NextError from 'next/error';

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        TOP LEVEL ERROR. <NextError statusCode={404} />
      </body>
    </html>
  );
}
