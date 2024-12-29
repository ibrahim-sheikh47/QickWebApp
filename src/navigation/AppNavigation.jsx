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
      </Route>
    </Routes>
  );
};
