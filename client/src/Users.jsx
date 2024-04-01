import { useState, useEffect, useContext } from "react";
import getAllUsers from "./api/getAllUsers";
import { TokenContext } from "./context/TokenContext";

const Users = () => {
  const { token } = useContext(TokenContext);

  const [users, setUsers] = useState([]);
  const [deniedAccess, setDeniedAccess] = useState(null);

  useEffect(() => {
    getAllUsers(token, setUsers, setDeniedAccess);
  }, []);

  return (
    <div>
      <hr />
      <h3>List Of Users Component</h3>
      {deniedAccess && <p>{deniedAccess}</p>}
      {users.length > 0 &&
        users.map((user, index) => (
          <div key={index} className="user-card">
            <p>username: {user.username}</p>
            <p>email: {user.email}</p>
            <p>admin?: {user.admin.toString()}</p>
          </div>
        ))}
    </div>
  );
};

export default Users;
