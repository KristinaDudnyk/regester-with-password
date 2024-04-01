const getAllUsers = async (token, setUsers, setDeniedAccess) => {
  try {
    const response = await fetch("http://localhost:4000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("fetchUsers, response", response);

    if (!response.ok) {
      setDeniedAccess(`${response.status} ${response.statusText}`);
      return;
    }

    const responseBody = await response.json();
    // console.log("fetchUsers, responseBody", responseBody);

    setUsers(responseBody);
  } catch (error) {
    console.error(error);
  }
};

export default getAllUsers;
