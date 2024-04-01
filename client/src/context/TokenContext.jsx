import { createContext, useEffect } from "react";
import { useState } from "react";

// create a context
// we use this later on our components to get the token with:
// const { token } = useContext(TokenContext)
export const TokenContext = createContext(null);

// create a context provider and pass it an object with values
// we give it some useState values so ANYTIME that "token" state changes
// the whole APP gets rendered (because it's a child of this component)
export const TokenContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("token");
    // console.log("TokenContextProvider, useEffect, local storage token", token);

    // CHECK IF THE TOKEN IS EXPIRED

    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <TokenContext.Provider value={{ token, setToken, logout }}>
      {children}
    </TokenContext.Provider>
  );
};

// we export both of them so
// we can use the top one in all our components
// we can use the bottom one in our main.jsx to wrap our App
