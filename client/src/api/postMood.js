const moodSubmit = async (event, token, newMoodData, setNewMoodData) => {
  event.preventDefault();

  try {
    const response = await fetch("http://localhost:4000/mood", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        mood: newMoodData.mood,
      }),
    });

    // console.log("moodSubmit, response", response);
    if (!response.ok) {
      throw new Error("send /mood failed");
    }

    // const responseBody = await response.json();
    // console.log("moodSubmit, responseBody", responseBody);

    setNewMoodData({ mood: "" });
  } catch (error) {
    console.error("function moodSubmit" + error);
  }
};

export default moodSubmit;
