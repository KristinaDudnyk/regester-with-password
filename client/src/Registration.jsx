import { useState } from "react";

function Registration() {
  const [registrationFormData, setRegistrationFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationFormData((prevRegistrationFormData) => ({
      ...prevRegistrationFormData,
      [name]: value,
    }));
  };

  async function authSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/registration", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: registrationFormData.username,
          password: registrationFormData.password,
          email: registrationFormData.email,
        }),
      });
      if (!response.ok) {
        throw new Error("fetch /registration failed");
      }
      const responseBody = await response.json();
      console.log(responseBody);
      setRegistrationFormData({ username: "", password: "", email: "" });
    } catch (error) {
      console.log("function auth" + error);
    }
  }

  return (
    <div>
      <h1>Registration</h1>
      <form onSubmit={authSubmit}>
        <input
          name="email"
          placeholder="react@example.com"
          value={registrationFormData.email}
          onChange={handleChange}
          required
        />
        <input
          name="username"
          value={registrationFormData.username}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          value={registrationFormData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Registration;
