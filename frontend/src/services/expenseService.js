const BASE_URL = "http://localhost:5000";

// FETCH
export const fetchExpensesService = async (
  token
) => {

  const res = await fetch(
    `${BASE_URL}/api/expenses`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return res.json();
};

// ADD
export const addExpenseService = async (
  token,
  expenseData
) => {

  await fetch(
    `${BASE_URL}/api/expenses/add`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",

        Authorization: token,
      },

      body: JSON.stringify(expenseData),
    }
  );
};

// DELETE
export const deleteExpenseService = async (
  token,
  id
) => {

  await fetch(
    `${BASE_URL}/api/expenses/${id}`,
    {
      method: "DELETE",

      headers: {
        Authorization: token,
      },
    }
  );
};