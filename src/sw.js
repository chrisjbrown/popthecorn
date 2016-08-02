self.addEventListener('install', () => {
  console.log('SW installed');
});

self.addEventListener('activate', () => {
  console.log('SW activated');
});

self.addEventListener('push', (event) => {
  console.log('Received a push message', event);

  const title = 'Yay a message.';
  const body = 'We have received a push message.';
  const icon = '/assets/icons/icon-4x.png';
  const tag = 'simple-push-demo-notification-tag';

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      tag: tag,
    })
  );
});
