import { useState, useEffect } from "react";

async function ListOfUsers({ token }) {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [deniedAccess, setDeniedAccess] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:4000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          setDeniedAccess(errorResponse);
          return;
        }

        const responseBody = await response.json();
        setListOfUsers(responseBody);
        setShow(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  });

  return (
    <>
      {!show && <h2>{deniedAccess}</h2>}
      {show &&
        listOfUsers.map((user, index) => (
          <div key={index}>
            <h4 key={index}>{user.useranme}</h4>
            <h4 key={index}>{user.email}</h4>
            <h4 key={index}>{user.admin}</h4>
          </div>
        ))}
    </>
  );
}

export default ListOfUsers;
