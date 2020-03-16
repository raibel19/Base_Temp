'use strict';
self.addEventListener('push', (event) => {
    debugger
    console.log('[Service Worker] Push Received');
    const data = event.data.json();
    const title = data.Title;
    const options = {
        body: data.Message,
        tag: 'data-notification',
        icon: '../../../images/push.png',
        badge: '../../../images/push.png',
        data: {
            time: new Date(Date.now()).toString(),
            message: data.Message,
            url: data.Url
        }
    };
    const promiseChain = self.registration.showNotification(title, options);
    event.waitUntil(promiseChain);
});

self.addEventListener('notificationclick', function (event) {
    debugger
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
    debugger
    const dismissedNotification = event.notification;

    const promiseChain = notificationCloseAnalytics();
    event.waitUntil(promiseChain);
});