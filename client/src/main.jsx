import React from "react";
import ReactDOM from "react-dom/client";
import { TokenContextProvider } from "./context/TokenContext.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TokenContextProvider>
      <App />
    </TokenContextProvider>
  </React.StrictMode>
);
