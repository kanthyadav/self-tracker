import { useState } from "react";

function ExpenseForm({
  fetchExpenses,
  token,
}) {
  const [title, setTitle] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [type, setType] =
    useState("expense");

  const addExpense = async () => {
    try {
      const res = await fetch(
        "https://self-tracker-1mv0.onrender.com/api/expenses/add",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              token,
          },

          body: JSON.stringify({
            title,
            amount: Number(
              amount
            ),
            type,
          }),
        }
      );

      const data =
        await res.json();

      if (res.ok) {
        setTitle("");
        setAmount("");
        setType("expense");

        fetchExpenses();

        alert(
          "Expense Added ✅"
        );
      } else {
        alert(
          data.message ||
            "Failed to add expense"
        );
      }
    } catch (error) {
      console.log(error);

      alert(
        "Server Error"
      );
    }
  };

  return (
    <div className="expense-form">
      <input
        className="expense-input"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) =>
          setTitle(
            e.target.value
          )
        }
      />

      <input
        className="expense-input"
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) =>
          setAmount(
            e.target.value
          )
        }
      />

      <select
        className="expense-select"
        value={type}
        onChange={(e) =>
          setType(
            e.target.value
          )
        }
      >
        <option value="expense">
          Expense
        </option>

        <option value="income">
          Income
        </option>
      </select>

      <button
        className="expense-btn"
        onClick={addExpense}
      >
        Add Expense
      </button>
    </div>
  );
}

export default ExpenseForm;