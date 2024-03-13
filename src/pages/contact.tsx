import config from '@/config';

export default function Contact() {
  return (
    <main>
      <h1>Contact page</h1>
      <p>
        <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a>
      </p>
    </main>
  );
}
