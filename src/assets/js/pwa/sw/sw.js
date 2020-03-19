'use strict';
self.addEventListener('push', (event) => {
    if (!event.data) {
        return;
    }
    event.waitUntil(push(event.data.json()));
});

self.addEventListener('notificationclick', function (event) {
    const urlToOpen = new URL(event.notification.data.url, self.location.origin).href;
    const promiseChain = clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    })
        .then((windowClients) => {
            let matchingClient = null;
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                if (windowClient.url === urlToOpen) {
                    matchingClient = windowClient;
                    break;
                }
            }
            if (matchingClient) {
                return matchingClient.focus();
            } else {
                return clients.openWindow(urlToOpen);
            }
        });

    // event.notification.close();

    // event.waitUntil(clients.openWindow(urlToOpen));
    event.waitUntil(promiseChain);
});

self.addEventListener('notificationclose', function (event) {
    const dismissedNotification = event.notification;

    // const promiseChain = notificationCloseAnalytics();
    // event.waitUntil(promiseChain);
});

function push(data) {
    console.log('[Service Worker] Push Received');
    return self.clients.matchAll({
        includeUncontrolled: true,
        type: 'window'
    })
        .then((rs) => {
            rs.forEach(client => { client.postMessage({ type: 'PUSH', data }); });
            if (!data || !data.Title) {
                return;
            }
            const title = data.Title;
            const options = {
                body: data.Message,
                // tag: 'data-notification',
                icon: '../../../images/push.png',
                badge: '../../../images/push.png',
                lang: 'es-419',
                vibrate: [200, 100, 200, 100, 200, 100, 200],
                data: data.Url
            };
            return self.registration.showNotification(title, options);
        });
}