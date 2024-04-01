import { useState, useContext } from "react";
import { TokenContext } from "./context/TokenContext";

function Login() {
  const { setToken } = useContext(TokenContext);

  const [loginFormData, setLoginFormData] = useState({
    password: "",
    email: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData((prevLoginFormData) => ({
      ...prevLoginFormData,
      [name]: value,
    }));
  };

  async function handleLogin(event) {
    event.preventDefault();

    setError("");

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify({
          password: loginFormData.password,
          email: loginFormData.email,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      console.log("handleLogin, response", response);

      if (!response.ok) {
        const responseBody = await response.json();
        setError(responseBody.message);
        return;
      }

      const responseBody = await response.json();
      console.log("handleLogin, responseBody", responseBody);

      localStorage.setItem("token", responseBody.token);
      setToken(responseBody.token);
    } catch (error) {
      console.log("function auth" + error);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          name="email"
          placeholder="react@example.com"
          value={loginFormData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          value={loginFormData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
