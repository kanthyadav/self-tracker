import { useEffect, useState } from "react";

function Dashboard({ setToken }) {
  const [expenses, setExpenses] = useState([]);

  const API_URL = "http://localhost:5000";

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API_URL}/api/expenses`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = await res.json();

      console.log("Expenses API Response:");
      console.log(data);

      if (Array.isArray(data)) {
        setExpenses(data);
      } else {
        setExpenses([]);
      }

    } catch (error) {
      console.log(error);
      setExpenses([]);
    }
  };

  const deleteExpense = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(
        `${API_URL}/api/expenses/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );

      fetchExpenses();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Expense Tracker 🚀</h1>

        <button onClick={logout}>
          Logout
        </button>
      </div>

      <hr />

      <h2>All Expenses</h2>

      {expenses.length === 0 ? (
        <p>No expenses found</p>
      ) : (
        Array.isArray(expenses) &&
        expenses.map((expense) => (
          <div
            key={expense._id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{expense.title}</h3>

            <p>
              Amount: ₹{expense.amount}
            </p>

            <p>
              Type: {expense.type}
            </p>

            <button
              onClick={() =>
                deleteExpense(expense._id)
              }
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;