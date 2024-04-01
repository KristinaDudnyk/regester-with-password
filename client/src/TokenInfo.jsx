import { useContext } from "react";
import { TokenContext } from "./context/TokenContext";

const TokenInfo = () => {
  const { token } = useContext(TokenContext);

  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const { userId, username, email, admin } = decodedToken;

  return (
    <>
      <hr />
      <h2>Token</h2>
      <p style={{ wordBreak: "break-all" }}>token: {JSON.stringify(token)}</p>
      <p>decoded token: {JSON.stringify(decodedToken)}</p>
      <p>userId: {userId}</p>
      <p>username: {username}</p>
      <p>email: {email}</p>
      <p>admin: {admin.toString()}</p>
    </>
  );
};

export default TokenInfo;
