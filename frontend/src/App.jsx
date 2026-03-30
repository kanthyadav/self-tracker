import { useState, useEffect } from "react";
import "./App.css";

let deferredPrompt;

const Splash = () => {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "#f5f7fa"
    }}>
      <h1>💸 Self Tracker</h1>
      <p>by Laxmikanth Yadav 🚀</p>
      <p>Loading...</p>
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLogin, setIsLogin] = useState(true);
  const [showInstall, setShowInstall] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [expenses, setExpenses] = useState([]);

  const BASE_URL = "https://self-tracker-1mv0.onrender.com";

  // 🔥 Splash timer
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // 🔥 PWA install
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      setShowInstall(true);
    });
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    setShowInstall(false);
  };

  // ✅ REGISTER
  const register = async (e) => {
    e.preventDefault();

    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registered successfully ✅");
      setIsLogin(true);
      setName("");
      setEmail("");
      setPassword("");
    } else {
      alert(data.message || "Register failed ❌");
    }
  };

  // ✅ LOGIN
  const login = async (e) => {
    e.preventDefault();

    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      alert("Login successful ✅");
    } else {
      alert(data.message || "Login failed ❌");
    }
  };

  // ✅ FETCH EXPENSES
  const fetchExpenses = async () => {
    const res = await fetch(`${BASE_URL}/api/expenses`, {
      headers: {
        Authorization: token,
      },
    });

    const data = await res.json();
    setExpenses(data);
  };

  useEffect(() => {
    if (token) fetchExpenses();
  }, [token]);

  // ✅ ADD EXPENSE
  const addExpense = async (e) => {
    e.preventDefault();

    await fetch(`${BASE_URL}/api/expenses/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        title,
        amount: Number(amount),
        type,
      }),
    });

    setTitle("");
    setAmount("");
    setType("expense");

    fetchExpenses();
  };

  // ✅ DELETE
  const deleteExpense = async (id) => {
    await fetch(`${BASE_URL}/api/expenses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });

    fetchExpenses();
  };

  // ✅ BALANCE
  const income = expenses
    .filter((i) => i.type === "income")
    .reduce((a, i) => a + i.amount, 0);

  const expense = expenses
    .filter((i) => i.type === "expense")
    .reduce((a, i) => a + i.amount, 0);

  const balance = income - expense;

  // 🔥 Show splash first
  if (loading) return <Splash />;

  // 🔐 AUTH UI
  if (!token) {
    return (
      <div className="container">
        <h1>{isLogin ? "Login 🔐" : "Register 📝"}</h1>

        <form onSubmit={isLogin ? login : register}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

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
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <br />

        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "New user? Register"
            : "Already have account? Login"}
        </button>
      </div>
    );
  }

  // 📊 DASHBOARD
  return (
    <div className="container">
      <h1>💸 Self Tracker</h1>
      <p style={{ textAlign: "center", fontSize: "14px", color: "gray" }}>
        by Laxmikanth Yadav 🚀
      </p>

      {/* Install Button */}
      {showInstall && (
        <button
          onClick={installApp}
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "10px",
            background: "#4f46e5",
            color: "white",
            border: "none",
          }}
        >
          Install App 📱
        </button>
      )}

      <button
        className="logout"
        onClick={() => {
          localStorage.removeItem("token");
          setToken(null);
        }}
      >
        Logout
      </button>

      <h2 className="balance">Balance: ₹{balance}</h2>

      <div className="summary">
        <p className="income">Income: ₹{income}</p>
        <p className="expense">Expense: ₹{expense}</p>
      </div>

      <form onSubmit={addExpense}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <button type="submit">Add Transaction</button>
      </form>

      <h3>Transactions</h3>

      {expenses.length === 0 ? (
        <p>No transactions</p>
      ) : (
        expenses.map((item) => (
          <div
            key={item._id}
            className={`transaction ${
              item.type === "income"
                ? "income-border"
                : "expense-border"
            }`}
          >
            <span>{item.title}</span>
            <span>₹{item.amount}</span>
            <button
              className="delete-btn"
              onClick={() => deleteExpense(item._id)}
            >
              X
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;