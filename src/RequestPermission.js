import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";
import { useStateContext } from "./context";

const useNotificationPermission = () => {
  const { fcmToken, setFCMToken } = useStateContext();

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_WEB_PUSH_CERTIFICATE,
      });
      if (!fcmToken || fcmToken !== token) setFCMToken(token);
    } else {
      console.log("Unable to get permission to notify.");
    }
  };

  return requestPermission;
};

export default useNotificationPermission;
