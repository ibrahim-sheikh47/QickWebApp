import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";

const requestPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    console.log("Notification permission granted.");
    const token = await getToken(messaging, {
      vapidKey:
      import.meta.env.VITE_FIREBASE_WEB_PUSH_CERTIFICATE,
    });
    console.log("FCM Token:", token);
    // Send the token to your server or store it for later use
  } else {
    console.log("Unable to get permission to notify.");
  }
};

export default requestPermission;
