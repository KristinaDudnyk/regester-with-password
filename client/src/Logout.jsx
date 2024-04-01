import { useContext } from "react";
import { TokenContext } from "./context/TokenContext";

const Logout = () => {
  const { logout } = useContext(TokenContext);

  return (
    <>
      <hr />
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default Logout;
