import { useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import AnalyticsCards from "../components/AnalyticsCards";
import ExpensePieChart from "../components/ExpensePieChart";

function Dashboard({ setToken }) {
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [activePage, setActivePage] =
    useState("dashboard");

  const API_URL =
    "https://self-tracker-1mv0.onrender.com";

  const token =
    localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const fetchExpenses = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/expenses`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setExpenses(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExpense = async (id) => {
    try {
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

  const updateExpense = async (id) => {
    try {
      await fetch(
        `${API_URL}/api/expenses/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            title: editTitle,
            amount: Number(editAmount),
            type: "expense",
          }),
        }
      );

      setEditingId(null);

      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          Expense Tracker 🚀
        </h1>

        <div className="dashboard-actions">
          <button
            className="nav-btn"
            onClick={() =>
              setActivePage(
                "dashboard"
              )
            }
          >
            🏠 Home
          </button>

          <button
            className="nav-btn"
            onClick={() =>
              setActivePage(
                "chart"
              )
            }
          >
            📊 Pie Chart
          </button>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      <hr />

      <AnalyticsCards
        token={token}
      />

      {activePage ===
        "chart" && (
        <ExpensePieChart
          token={token}
        />
      )}

      <hr />

      <ExpenseForm
        fetchExpenses={
          fetchExpenses
        }
        token={token}
      />

      <hr />

      <h2 className="expenses-heading">
        All Expenses
      </h2>

      {expenses.length === 0 ? (
        <p className="empty-message">
          No expenses found
        </p>
      ) : (
        expenses.map(
          (expense) => (
            <div
              key={expense._id}
              className="expense-card"
            >
              {editingId ===
              expense._id ? (
                <>
                  <input
                    className="edit-input"
                    value={
                      editTitle
                    }
                    onChange={(e) =>
                      setEditTitle(
                        e.target.value
                      )
                    }
                  />

                  <input
                    className="edit-input"
                    type="number"
                    value={
                      editAmount
                    }
                    onChange={(e) =>
                      setEditAmount(
                        e.target.value
                      )
                    }
                  />

                  <button
                    className="save-btn"
                    onClick={() =>
                      updateExpense(
                        expense._id
                      )
                    }
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <h3 className="expense-title">
                    {
                      expense.title
                    }
                  </h3>

                  <p className="expense-amount">
                    Amount: ₹
                    {
                      expense.amount
                    }
                  </p>

                  <p className="expense-type">
                    Type:{" "}
                    {
                      expense.type
                    }
                  </p>

                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditingId(
                        expense._id
                      );
                      setEditTitle(
                        expense.title
                      );
                      setEditAmount(
                        expense.amount
                      );
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteExpense(
                        expense._id
                      )
                    }
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          )
        )
      )}
    </div>
  );
}

export default Dashboard;