self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', function(event) {
  let data = { title: 'Reeks Store molecular Alert', body: 'A new cellular skincare routine has been calculated!' };
  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data = { title: 'Reeks Store Alert', body: event.data.text() };
    }
  }

  const options = {
    body: data.body,
    icon: 'https://images.unsplash.com/photo-1608248597481-496100c80836?w=192&auto=format&fit=crop&q=60',
    badge: 'https://images.unsplash.com/photo-1608248597481-496100c80836?w=72&auto=format&fit=crop&q=60',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
