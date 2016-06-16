function sendSubscriptionToServer(subscription) {
  thesub = subscription;
  if(subscription && subscription.endpoint) {
    console.log(subscription.endpoint);
    var splits = subscription.endpoint.split('/');
    var id = splits[splits.length - 1];
    localforage.setDriver(localforage.INDEXEDDB)
    localforage.setItem('subId', id).then(function() { console.log('endpoint set: ', id); });

    $.post('http://localhost:3000/api/token/' + id, {}, function(response){
        console.info("Success", response);
    }).done(function(){
        //done callback
    }).fail(function(error){
        console.error("Created failed", error)
    });
  }

  console.log('registered with server');
}

window.addEventListener('load', function() {
  console.log('window loaded');

  function regWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/worker.js')
      .then(serviceWorkerRegistered);
    } else {
      console.warn('Service workers aren\'t supported in this browser.');
    }
  }

  // Check for Notifications API permissions
  if(Notification.permission !== "granted") {
    Notification.requestPermission(function(result) {
      if (result === 'denied') {
        console.log('Permission wasn\'t granted.');
        return;
      } else if (result === 'default') {
        console.log('The permission request was dismissed.');
        return;
      }
      console.log('Permission was granted for notifications');
      regWorker();
    });
  } else {
    regWorker();
  }
});


// Once the service worker is registered set the initial state
function serviceWorkerRegistered(registration) {
  console.log('registered worker');
  // Are Notifications supported in the service worker?
  if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
    console.warn('Notifications aren\'t supported.');
    return;
  }

  // Check the current Notification permission.
  // If its denied, it's a permanent block until the
  // user changes the permission
  if (Notification.permission === 'denied') {
    console.warn('The user has blocked notifications.');
    return;
  } else if (Notification.permission === "granted") {
   // If it's okay let's create a notification
   var notification = new Notification("test notification!");
   console.log('permission granted for notification');
 }

  // Check if push messaging is supported
  if (!('PushManager' in window)) {
    console.warn('Push messaging isn\'t supported.');
    return;
  }

  var serviceWorker;
  if (registration.installing) {
    serviceWorker = registration.installing;
    console.log('worker installing');
  } else if (registration.waiting) {
    serviceWorker = registration.waiting;
    console.log('worker waiting');
  } else if (registration.active) {
    serviceWorker = registration.active;
    console.log('worker active');
  }

  if (serviceWorker) {
    console.log('service worker state: ', serviceWorker.state);
    if(serviceWorker.state === "installed" || serviceWorker.state === "activated") {
      doSubscribe();
    }
    serviceWorker.addEventListener('statechange', function(e) {
      if(e.target.state === "activated") {
        doSubscribe();
      }
      console.log('service worker state change: ', e.target.state);
    });
  }

  function doSubscribe() {
    if (registration.active) {
      console.log('installing push');
      registration.pushManager.subscribe({
            userVisibleOnly: true
        })
        .then(function(subscription) {
          console.log('push manager subscription: ', subscription);
          return sendSubscriptionToServer(subscription);
        })
      .catch(function(e) {
        console.log('push manager subscription fail: ', e);
      });
    }
  }
}
