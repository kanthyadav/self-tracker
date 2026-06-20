function TransactionList({
  expenses,
  fetchExpenses,
  token,
}) {
  const deleteExpense = async (id) => {
    try {
      await fetch(
        `https://self-tracker-1mv0.onrender.com/api/expenses/${id}`,
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

  return (
    <div className="transaction-list">
      <h2 className="transaction-heading">
        Transactions
      </h2>

      {expenses?.map((item) => (
        <div
          key={item._id}
          className="transaction-card"
        >
          <h3 className="transaction-title">
            {item.title}
          </h3>

          <p className="transaction-amount">
            ₹ {item.amount}
          </p>

          <p className="transaction-type">
            {item.type}
          </p>

          <button
            className="delete-btn"
            onClick={() =>
              deleteExpense(item._id)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;