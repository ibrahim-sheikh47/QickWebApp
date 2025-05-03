import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// Pages
import {
  BookingReport,
  CalendarComponent,
  Chats,
  CreditHolderReport,
  Dashboard,
  Notifications,
  Profile,
  Reports,
  SalesReport,
  SignIn,
  SignUp,
  SplashScreen,
  Users,
  UsersReport,
  CommunicationHistory,
  EventReport,
  Events,
  AddEvent,
  AddResults,
  CardInfoPage,
  TeamDetail,
  TokenizationForm,
} from "../pages";
import CardDetailPage from "../pages/Dashboard/Events/CardDetailPage/CardDetailPage";
import { useStateContext } from "../context";
import { connectSocket, disconnectSocket } from "../utils/socket";
import CreateMerchantForm from "../components/CreateMerchantForm/CreateMerchantForm";
import submitMerchantApplication from "../components/CreateMerchantForm/submitMerchantApplication";

export const AppNavigation = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const { user } = useStateContext();

  useEffect(() => {
    if (user) {
      connectSocket(user);
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      disconnectSocket();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // if (isMobile) {
  //   return (
  //     <div className="text-center items-center justify-center min-h-screen flex bg-secondary">
  //       <p className="bg-black text-lime p-10 rounded-2xl text-2xl font-PJSbold">
  //         SWITCH TO MOBILE APP
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <Routes>
      <Route Component={SplashScreen} path="/" />
      <Route Component={SignIn} path="/SignIn" />
      <Route Component={SignUp} path="/SignUp" />
      <Route Component={Dashboard} path="/Dashboard">
        <Route Component={CalendarComponent} path="Calendar/:id?" />
        <Route Component={Reports} path="Reports" />
        <Route Component={Chats} path="Chats" />
        <Route Component={Users} path="Users" />
        <Route Component={Notifications} path="Notifications" />
        <Route Component={Profile} path="Profile" />
        <Route Component={BookingReport} path="Reports/BookingReport/:id?" />
        <Route Component={SalesReport} path="Reports/SalesReport/:id?" />
        <Route Component={UsersReport} path="Reports/UsersReport" />
        <Route
          Component={CreditHolderReport}
          path="Reports/CreditHolderReport"
        />
        <Route
          Component={CommunicationHistory}
          path="/Dashboard/Chats/CommunicationHistory"
        />
        <Route Component={EventReport} path="Reports/EventReport" />

        <Route Component={Events} path="Events" />
        <Route Component={AddEvent} path="Events/AddEvent" />

        <Route Component={CardInfoPage} path="Events/EventInfo" />
        <Route Component={CardDetailPage} path="Events/EventDetail" />
        <Route Component={AddResults} path="Events/EventDetail/AddResults" />

        <Route
          path="Events/EventDetail/TeamDetail/:teamName"
          Component={TeamDetail}
        />
      </Route>
      <Route path="/Tokenization/:type?" Component={TokenizationForm} />
      <Route
        path="/Finix-Onboarding"
        element={<CreateMerchantForm onSubmit={submitMerchantApplication} />}
      />

      <Route path="*" Component={() => <h1>404 - Not Found</h1>} />
    </Routes>
  );
};
