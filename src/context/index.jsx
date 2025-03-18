import React, { useContext, createContext, useState, useEffect } from "react";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // Load initial state from localStorage (or set default values)
  const [currentFacility, setCurrentFacility] = useState(
    () => JSON.parse(localStorage.getItem("currentFacility")) || null
  );
  const [myFacilities, setMyFacilities] = useState(
    () => JSON.parse(localStorage.getItem("myFacilities")) || []
  );
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );
  const [fcmToken, setFCMToken] = useState(
    () => JSON.parse(localStorage.getItem("fcmToken")) || null
  );

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("currentFacility", JSON.stringify(currentFacility));
  }, [currentFacility]);

  useEffect(() => {
    localStorage.setItem("myFacilities", JSON.stringify(myFacilities));
  }, [myFacilities]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("fcmToken", JSON.stringify(fcmToken));
  }, [fcmToken]);

  return (
    <StateContext.Provider
      value={{
        myFacilities,
        setMyFacilities,
        currentFacility,
        setCurrentFacility,
        user,
        setUser,
        fcmToken,
        setFCMToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
