import { useContext, useState, useEffect } from "react";
import { TokenContext } from "./context/TokenContext";
import getProtected from "./api/getProtected";

const ProtectedMessage = () => {
  const { token } = useContext(TokenContext);

  const [protectedMessage, setProtectedMessage] = useState(null);

  useEffect(() => {
    getProtected(token, setProtectedMessage);
  }, []);

  return (
    <div>
      <hr />
      <h3>ProtectedMessage Component</h3>
      <p>protected message: {protectedMessage ? protectedMessage : "null"}</p>
    </div>
  );
};

export default ProtectedMessage;
