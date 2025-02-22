import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";
import { useStateContext } from "./context";

const requestPermission = async () => {
  const { setFCMToken } = useStateContext();

  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    console.log("Notification permission granted.");
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_WEB_PUSH_CERTIFICATE,
    });
    setFCMToken(token);
  } else {
    console.log("Unable to get permission to notify.");
  }
};

export default requestPermission;
