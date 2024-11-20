importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');
firebase.initializeApp({
    apiKey: 'AIzaSyADbwfFaQd96ohacfpxMpyPmyAO-gyad2s',
    authDomain: 'well-tran.firebaseapp.com',
    projectId: 'well-tran',
    storageBucket: 'well-tran.appspot.com',
    messagingSenderId: '226047920758',
    appId: '1:226047920758:web:6fc3499b1824d1ee87ed57',
    measurementId: 'G-RYWC953BEH',
});

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
 // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});