import { useContext, useState, useEffect } from "react";
import { TokenContext } from "./context/TokenContext";
import getAllMoods from "./api/getAllMoods";
import postMood from "./api/postMood";

const Moods = () => {
  const { token } = useContext(TokenContext);

  const [newMoodData, setNewMoodData] = useState({
    mood: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewMoodData((prevnewMoodData) => ({
      ...prevnewMoodData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    postMood(event, token, newMoodData, setNewMoodData);
    // setTimeout(() => {}, 1000);
    getAllMoods(token, setMoods);
  };

  const [moods, setMoods] = useState([]);

  useEffect(() => {
    getAllMoods(token, setMoods);
  }, []);

  return (
    <div>
      <hr />
      <h3>Moods Component</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="mood"
          placeholder="tell me :D"
          value={newMoodData.mood}
          onChange={handleChange}
          required
        />
        <button type="submit">Add A Mood</button>
      </form>
      <h4>List of Moods</h4>
      {moods && (
        <ul>
          {moods.map((mood, index) => (
            <li key={index}>{mood.mood}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Moods;
