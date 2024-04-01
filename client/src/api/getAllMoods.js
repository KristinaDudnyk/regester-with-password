const getAllMoods = async (token, setMoods) => {
  try {
    const response = await fetch("http://localhost:4000/moods", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("getAllMoods, response", response);

    if (!response.ok) {
      throw new Error("fuck you bitch");
    }

    const responseBody = await response.json();
    // console.log("getAllMoods, responseBody", responseBody);

    setMoods(responseBody);
  } catch (error) {
    console.log(error);
  }
};

export default getAllMoods;
