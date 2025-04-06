self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title;
  const body = data.body;
  const icon = data.icon;
  const url = data.data.url;

  const options = {
    body,
    tag: 'push-notification',
    vibrate: [100, 50, 100],
    icon,
    data: {
      url,
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
