import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [expenses, setExpenses] = useState([]);

  // ✅ REGISTER
  const register = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/register", {
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

    const res = await fetch("http://localhost:5000/api/auth/login", {
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
    const res = await fetch("http://localhost:5000/api/expenses", {
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

    await fetch("http://localhost:5000/api/expenses/add", {
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
    await fetch(`http://localhost:5000/api/expenses/${id}`, {
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

  // 🔐 AUTH UI
  if (!token) {
    return (
      <div className="container">
        <h1>{isLogin ? "Login 🔐" : "Register 📝"}</h1>

        <form onSubmit={isLogin ? login : register}>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </>
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

        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "New user? Register"
            : "Already have account? Login"}
        </button>
      </div>
    );
  }

  // 📊 DASHBOARD UI
  return (
    <div className="container">
      <h1>💸 Self Tracker</h1>

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