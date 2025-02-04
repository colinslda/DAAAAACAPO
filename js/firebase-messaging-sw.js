import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging/sw';

const app = initializeApp({
  // Votre configuration Firebase
});

const messaging = getMessaging(app);
