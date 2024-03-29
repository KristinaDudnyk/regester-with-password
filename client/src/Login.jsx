import { useState } from "react";

function Login({ setToken }) {
  const [loginFormData, setLoginFormData] = useState({
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prevLoginFormData) => ({
      ...prevLoginFormData,
      [name]: value,
    }));
  };

  async function authSubmit(e) {
    e.preventDefault();
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
      if (!response.ok) {
        throw new Error("fetch /login failed");
      }
      const responseBody = await response.json();
      console.log(responseBody);
      setToken(responseBody.token);
    } catch (error) {
      console.log("function auth" + error);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={authSubmit}>
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
      {/* <h3>data from /auth</h3>
        <p>{data}</p> */}
    </div>
  );
}

export default Login;
