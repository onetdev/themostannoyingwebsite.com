'use client';
 
import Error from 'next/error';
 
export default function NotFound() {
  return (
    <html lang="en">
      <body>
        TOP LEVEL ERROR. <Error statusCode={404} />
      </body>
    </html>
  );
}
