import { useState } from "react";
import ListOfUsers from "./ListOfUsers";

const Dashboard = ({ token, setToken }) => {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const { userId, username, email, admin } = decodedToken;

  const [protectedMessage, setProtectedMessage] = useState(null);

  async function sendTokenToServer() {
    try {
      const response = await fetch("http://localhost:4000/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("fuck you bitch");
      }
      const responseBody = await response.json();
      console.log(responseBody);
      setProtectedMessage(responseBody.message);
    } catch (error) {
      console.log(error);
    }
  }

  const [newMoodData, setNewMoodData] = useState({
    mood: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMoodData((prevnewMoodData) => ({
      ...prevnewMoodData,
      [name]: value,
    }));
  };

  async function moodSubmit(e) {
    e.preventDefault();

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
      if (!response.ok) {
        throw new Error("send /mood failed");
      }
      const responseBody = await response.json();
      console.log(responseBody);
      setNewMoodData({ mood: "" });
    } catch (error) {
      console.error("function moodSubmit" + error);
    }
  }

  const [moods, setMoods] = useState([]);

  async function getAllMoods() {
    try {
      const response = await fetch("http://localhost:4000/moods", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("fuck you bitch");
      }
      const responseBody = await response.json();
      console.log(responseBody);
      setMoods(responseBody);
    } catch (error) {
      console.log(error);
    }
  }

  const [showComponent, setShowComponent] = useState(false);

  const handleClick = () => {
    setShowComponent(true);
  };
  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <p>You are logged in!</p>
        <p style={{ wordBreak: "break-all" }}>token: {JSON.stringify(token)}</p>
        <p>decoded token: {JSON.stringify(decodedToken)}</p>
        <p>userId: {userId}</p>
        <p>username: {username}</p>
        <p>email: {email}</p>
        <p>admin??: {admin ? "yes" : "no, the user is not admin"}</p>
        <button onClick={() => setToken("")}>Log Out</button>
        <hr />
        <button onClick={() => sendTokenToServer()}>
          Get Protected Message
        </button>
        {protectedMessage && <p>Protected Message:{protectedMessage}</p>}
      </div>
      <form onSubmit={moodSubmit}>
        <input
          name="mood"
          placeholder="tell me :D"
          value={newMoodData.mood}
          onChange={handleChange}
          required
        />

        <button type="submit">ADD</button>
      </form>
      <button onClick={getAllMoods}>Get all my moods</button>
      {moods.map((mood, index) => (
        <li key={index}>{mood.mood}</li>
      ))}
      <button onClick={handleClick}>Load Component</button>
      {showComponent && <ListOfUsers token={token} />}
    </>
  );
};

export default Dashboard;
