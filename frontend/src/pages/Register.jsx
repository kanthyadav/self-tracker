import { useState } from "react";

import { registerUser } from "../services/authService";

function Register({ setIsLogin }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();

    const data = await registerUser(
      name,
      email,
      password
    );

    if (!data.message?.includes("failed")) {

      alert("Registered successfully ✅");

      setIsLogin(true);

    } else {
      alert(data.message || "Register failed ❌");
    }
  };

  return (
    <div className="container">

      <h1>Register 📝</h1>

      <form onSubmit={register}>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          Register
        </button>

      </form>

      <button onClick={() => setIsLogin(true)}>
        Already have account? Login
      </button>

    </div>
  );
}

export default Register;