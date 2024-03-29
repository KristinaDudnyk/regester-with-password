import { useState } from "react";
import Registration from "./Registration";
import Login from "./Login";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
  const [token, setToken] = useState("");

  return (
    <>
      <h1>Authentication</h1>
      <div>
        <Registration />
        <Login setToken={setToken} />
        {token && <Dashboard token={token} setToken={setToken} />}
      </div>
    </>
  );
}

export default App;
