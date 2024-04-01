const getProtected = async (token, setProtectedMessage) => {
  try {
    const response = await fetch("http://localhost:4000/protected", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("getProtected, response", response);

    if (!response.ok) {
      throw new Error("SOME ERROR");
    }

    const responseBody = await response.json();
    // console.log("getProtected, responseBody", responseBody);

    setProtectedMessage(responseBody.message);
  } catch (error) {
    console.log(error);
  }
};

export default getProtected;
