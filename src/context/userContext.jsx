"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext({
  isLogin: false,
  setIsLogin: () => {},
  selectedDistance: 0,
  setSelectedDistance: () => {},
});

export const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [selectedDistance, setSelectedDistance] = useState();

  return <UserContext.Provider value={{ isLogin, setIsLogin, selectedDistance, setSelectedDistance }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
