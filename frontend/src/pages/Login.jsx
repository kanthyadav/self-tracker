import { useState } from "react";

function Login({
  setToken,
  setIsLogin,
}) {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const API_URL =
    "https://self-tracker-1mv0.onrender.com";

  const handleLogin = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data =
        await res.json();

      console.log(data);

      if (res.ok) {
        localStorage.setItem(
          "token",
          data.token
        );

        setToken(data.token);

        alert(
          "Login Successful 🚀"
        );
      } else {
        alert(
          data.message ||
            "Login Failed"
        );
      }
    } catch (error) {
      console.log(error);

      alert("Server Error");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">
        Login 
      </h1>

      <input
        className="login-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
      />

      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
      />

      <button
        className="login-btn"
        onClick={handleLogin}
      >
        Login
      </button>

      <button
        className="switch-auth-btn"
        onClick={() =>
          setIsLogin(false)
        }
      >
        Create Account
      </button>
    </div>
  );
}

export default Login;