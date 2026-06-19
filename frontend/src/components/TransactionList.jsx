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
    <div>
      <h2>Transactions</h2>

      {expenses?.map((item) => (
        <div key={item._id}>
          <h3>{item.title}</h3>

          <p>₹ {item.amount}</p>

          <p>{item.type}</p>

          <button
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