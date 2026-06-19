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
    <div
      style={{
        padding: "20px",
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >
        <h1>
          Expense Tracker 🚀
        </h1>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            onClick={() =>
              setActivePage(
                "dashboard"
              )
            }
          >
            🏠 Home
          </button>

          <button
            onClick={() =>
              setActivePage(
                "chart"
              )
            }
          >
            📊 Pie Chart
          </button>

          <button
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

      <h2>All Expenses</h2>

      {expenses.length === 0 ? (
        <p>No expenses found</p>
      ) : (
        expenses.map(
          (expense) => (
            <div
              key={expense._id}
              style={{
                border:
                  "1px solid #ddd",
                padding: "12px",
                marginBottom:
                  "10px",
                borderRadius:
                  "8px",
              }}
            >
              {editingId ===
              expense._id ? (
                <>
                  <input
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
                  <h3>
                    {
                      expense.title
                    }
                  </h3>

                  <p>
                    Amount: ₹
                    {
                      expense.amount
                    }
                  </p>

                  <p>
                    Type:{" "}
                    {
                      expense.type
                    }
                  </p>

                  <button
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
                    onClick={() =>
                      deleteExpense(
                        expense._id
                      )
                    }
                    style={{
                      marginLeft:
                        "10px",
                    }}
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