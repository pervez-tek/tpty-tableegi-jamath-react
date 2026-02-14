// auth/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();
// Custom Hooks
export const useAuth = () => useContext(AuthContext);

export const useAuth1 = () => {

  //use hook also recommend
  const authContext = useContext(AuthContext);

  if (authContext === undefined) {
    return new Error("Componenet must be wrraped inside AuthContext Provider");
  }
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem("user"));
  const [user, setUser] = useState(() => {
    const raw = sessionStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    sessionStorage.removeItem("user");
  };

  return (
    // two curly braces {{}} important
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
