// NotificationContext.js
import { createContext, useContext } from "react";

export const OutletContext = createContext();
export const useNotificationContext = () => useContext(OutletContext);
