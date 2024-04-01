import { useContext, useState } from "react";
import { TokenContext } from "./context/TokenContext";

import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";
import Dashboard from "./Dashboard";

function App() {
  const { token } = useContext(TokenContext);

  const [toggle, setToggle] = useState(false);

  return (
    <>
      <h1>Authentication</h1>
      <hr />
      <div>
        {toggle ? <Register /> : <Login />}
        <hr />
        <button onClick={() => setToggle((prevToggle) => !prevToggle)}>
          {toggle ? "Login" : "Register"}
        </button>
      </div>
      {token && <Logout />}
      {token && <Dashboard />}
    </>
  );
}

export default App;
