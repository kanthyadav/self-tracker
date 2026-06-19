import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [isLogin, setIsLogin] = useState(true);

  if (token) {
    return (
      <Dashboard
        setToken={setToken}
      />
    );
  }

  return isLogin ? (
    <Login
      setToken={setToken}
      setIsLogin={setIsLogin}
    />
  ) : (
    <Register
      setIsLogin={setIsLogin}
    />
  );
}

export default App;