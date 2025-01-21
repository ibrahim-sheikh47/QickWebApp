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
} from "../pages";
import EventReport from "../pages/Dashboard/Reports/EventReport";
import Events from "../pages/Dashboard/Events/Events";
import AddEvent from "../pages/Dashboard/Events/AddEvent";
import CardInfoPage from "../pages/Dashboard/Events/CardInfoPage";
import CardDetailPage from "../pages/Dashboard/Events/CardDetailPage";

export const AppNavigation = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="text-center items-center justify-center min-h-screen flex bg-secondary">
        <p className="bg-black text-lime p-10 rounded-2xl text-2xl font-PJSbold">
          SWITCH TO MOBILE APP
        </p>
      </div>
    );
  }

  return (
    <Routes>
      <Route Component={SplashScreen} path="/" />
      <Route Component={SignIn} path="/SignIn" />
      <Route Component={SignUp} path="/SignUp" />
      <Route Component={Dashboard} path="/Dashboard">
        <Route Component={CalendarComponent} path="Calendar" />
        <Route Component={Reports} path="Reports" />
        <Route Component={Chats} path="Chats" />
        <Route Component={Users} path="Users" />
        <Route Component={Notifications} path="Notifications" />
        <Route Component={Profile} path="Profile" />
        <Route Component={BookingReport} path="Reports/BookingReport" />
        <Route Component={SalesReport} path="Reports/SalesReport" />
        <Route Component={UsersReport} path="Reports/UsersReport" />
        <Route
          Component={CreditHolderReport}
          path="Reports/CreditHolderReport"
        />
        <Route Component={EventReport} path="Reports/EventReport" />

        <Route Component={Events} path="Events" />
        <Route Component={AddEvent} path="Events/AddEvent" />

        <Route Component={CardInfoPage} path="Events/EventInfo" />
        <Route Component={CardDetailPage} path="Events/EventDetail" />
      </Route>
    </Routes>
  );
};
