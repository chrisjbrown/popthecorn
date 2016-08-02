export function subscribe() {
  // Disable the button so it can't be changed while
  // we process the permission request
  // const pushButton = document.querySelector('.js-push-button');
  // pushButton.disabled = true;

  return navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
    return serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
      .then((subscription) => {
        // The subscription was successful
        // isPushEnabled = true;
        // pushButton.textContent = 'Disable Push Messages';
        // pushButton.disabled = false;

        // TODO: Send the subscription.endpoint to your server
        // and save it to send a push message at a later date
        // return sendSubscriptionToServer(subscription);
        return subscription;
      })
      .catch((e) => {
        if (Notification.permission === 'denied') {
          // The user denied the notification permission which
          // means we failed to subscribe and the user will need
          // to manually change the notification permission to
          // subscribe to push messages
          console.warn('Permission for Notifications was denied');
          // pushButton.disabled = true;
        } else {
          // A problem occurred with the subscription; common reasons
          // include network errors, and lacking gcm_sender_id and/or
          // gcm_user_visible_only in the manifest.
          console.error('Unable to subscribe to push.', e);
          // pushButton.disabled = false;
          // pushButton.textContent = 'Enable Push Messages';
        }
      });
  });
}

export function unsubscribe() {
  // var pushButton = document.querySelector('.js-push-button');
  // pushButton.disabled = true;

  return navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
    // To unsubscribe from push messaging, you need get the
    // subscription object, which you can call unsubscribe() on.
    return serviceWorkerRegistration.pushManager.getSubscription().then(
      (pushSubscription) => {
        // Check we have a subscription to unsubscribe
        if (!pushSubscription) {
          // No subscription object, so set the state
          // to allow the user to subscribe to push
          // isPushEnabled = false;
          // pushButton.disabled = false;
          // pushButton.textContent = 'Enable Push Messages';
          return {};
        }

        // var subscriptionId = pushSubscription.subscriptionId;
        // TODO: Make a request to your server to remove
        // the subscriptionId from your data store so you
        // don't attempt to send them push messages anymore

        // We have a subscription, so call unsubscribe on it
        return pushSubscription.unsubscribe().then((successful) => {
          // pushButton.disabled = false;
          // pushButton.textContent = 'Enable Push Messages';
          // isPushEnabled = false;

          return successful;
        }).catch((e) => {
          // We failed to unsubscribe, this can lead to
          // an unusual state, so may be best to remove
          // the users data from your data store and
          // inform the user that you have done so

          // console.log('Unsubscription error: ', e);
          // pushButton.disabled = false;
          // pushButton.textContent = 'Enable Push Messages';
          console.error(e);
        });
      }).catch((e) => {
        console.error('Error thrown while unsubscribing from push messaging.', e);
      });
  });
}

export function initialiseState() {
  // Are Notifications supported in the service worker?
  if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
    console.warn('Notifications aren\'t supported.');
    return {};
  }

  // Check the current Notification permission.
  // If its denied, it's a permanent block until the
  // user changes the permission
  if (Notification.permission === 'denied') {
    console.warn('The user has blocked notifications.');
    return {};
  }

  // Check if push messaging is supported
  if (!('PushManager' in window)) {
    console.warn('Push messaging isn\'t supported.');
    return {};
  }

  // We need the service worker registration to check for a subscription
  return navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
    // Do we already have a push message subscription?
    return serviceWorkerRegistration.pushManager.getSubscription()
      .then((subscription) => {
        // Enable any UI which subscribes / unsubscribes from
        // push messages.
        // const pushButton = document.querySelector('.js-push-button');
        // pushButton.disabled = false;

        // if (!subscription) {
        //   // We aren't subscribed to push, so set UI
        //   // to allow the user to enable push
        //   return;
        // }

        // Keep your server in sync with the latest subscriptionId
        // sendSubscriptionToServer(subscription);

        // Set your UI to show they have subscribed for
        // push messages
        // pushButton.textContent = 'Disable Push Messages';
        // isPushEnabled = true;
        return subscription;
      })
      .catch((err) => {
        console.warn('Error during getSubscription()', err);
      });
  });
}
