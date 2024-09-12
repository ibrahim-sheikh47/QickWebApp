import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// Pages
import {
  Calendar,
  Chats,
  Dashboard,
  Notifications,
  Profile,
  Reports,
  SignIn,
  SignUp,
  Users,
} from "../pages";
import SplashScreen from "../pages/SplashScreen";
import BookingReport from "../pages/Dashboard/Reports/BookingReport";
import SalesReport from "../pages/Dashboard/Reports/SalesReport";
import UsersReport from "../pages/Dashboard/Reports/UsersReport";
import CreditHolderReport from "../pages/Dashboard/Reports/CreditHolderReport";

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
    return <div className="text-center items-center justify-center min-h-screen flex  text-2xl font-PJSbold">OPEN MOBILE APP</div>;
  }

  return (
    <Routes>
      <Route Component={SplashScreen} path="/" />
      <Route Component={SignIn} path="/SignIn" />
      <Route Component={SignUp} path="/SignUp" />
      <Route Component={Dashboard} path="/Dashboard">
        <Route Component={Calendar} path="Calendar" />
        <Route Component={Reports} path="Reports" />
        <Route Component={Chats} path="Chats" />
        <Route Component={Users} path="Users" />
        <Route Component={Notifications} path="Notifications" />
        <Route Component={Profile} path="Profile" />
        <Route Component={BookingReport} path="Reports/BookingReport" />
        <Route Component={SalesReport} path="Reports/SalesReport" />
        <Route Component={UsersReport} path="Reports/UsersReport" />
        <Route Component={CreditHolderReport} path="Reports/CreditHolderReport" />
      </Route>
    </Routes>
  );
};

