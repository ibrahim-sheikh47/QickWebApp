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

  // Save state to localStorage whenever it changes
  useEffect(() => {
    console.log(currentFacility);
    localStorage.setItem("currentFacility", JSON.stringify(currentFacility));
  }, [currentFacility]);

  useEffect(() => {
    localStorage.setItem("myFacilities", JSON.stringify(myFacilities));
  }, [myFacilities]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <StateContext.Provider
      value={{
        myFacilities,
        setMyFacilities,
        currentFacility,
        setCurrentFacility,
        user,
        setUser,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
