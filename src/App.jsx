import { AppNavigation } from "./navigation/AppNavigation";
import { StateContextProvider, useStateContext } from "./context";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connectSocket, disconnectSocket } from "./utils/socket";

function App() {
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Foreground notification received:", payload);

      // Display a toast notification
      toast.info(
        `${payload.notification.title}: ${payload.notification.body}`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <ToastContainer />

      <DndProvider backend={HTML5Backend}>
        <StateContextProvider>
          <AppNavigation />
        </StateContextProvider>
      </DndProvider>
    </>
  );
}

export default App;
