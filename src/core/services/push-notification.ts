import * as firebase from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

export const askForPermissionToReceiveNotifications = async () => {
    const app = firebase.initializeApp({
        apiKey: 'AIzaSyADbwfFaQd96ohacfpxMpyPmyAO-gyad2s',
        authDomain: 'well-tran.firebaseapp.com',
        projectId: 'well-tran',
        storageBucket: 'well-tran.appspot.com',
        messagingSenderId: '226047920758',
        appId: '1:226047920758:web:6fc3499b1824d1ee87ed57',
        measurementId: 'G-RYWC953BEH',
    });

    try {
        const messaging = getMessaging(app);
        await Notification.requestPermission();
        const token = await getToken(messaging);
        return token;
        // You can now send this token to your server to send push notifications.
    } catch (error) {
        console.error('Error requesting notification permission:', error);
    }
};
