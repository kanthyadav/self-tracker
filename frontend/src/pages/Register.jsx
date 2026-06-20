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
      alert(
        data.message ||
          "Register failed ❌"
      );
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">
        Register 
      </h1>

      <form
        className="register-form"
        onSubmit={register}
      >
        <input
          className="register-input"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

        <input
          className="register-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          className="register-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          required
        />

        <button
          className="register-btn"
          type="submit"
        >
          Register
        </button>
      </form>

      <button
        className="switch-auth-btn"
        onClick={() =>
          setIsLogin(true)
        }
      >
        Already have account? Login
      </button>
    </div>
  );
}

export default Register;