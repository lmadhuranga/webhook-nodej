'use strict';

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  const payload = event.data.json();
  const title = payload.title;
  const options = {
    body: `Yay,${ payload.body}`,
    icon: `${payload.icon}`,
    badge: `${payload.badge}`,
    data: {name:'mmad'},
    silent: true
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  console.log('event',event);
  console.log('[Service Worker] Notification click Received.');
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://developers.google.com/web/')
  );
});
