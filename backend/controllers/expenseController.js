import Expense from "../models/Expense.js";

// GET ALL EXPENSES
export const getExpenses = async (
  req,
  res
) => {
  try {

    const expenses = await Expense.find({
      user: req.user,
    });

    res.json(expenses);

  } catch (error) {

    res.status(500).json({
      message: "Server error",
    });

  }
};

// ADD EXPENSE
export const addExpense = async (
  req,
  res
) => {
  try {

    const {
      title,
      amount,
      type,
    } = req.body;

    const expense =
      await Expense.create({
        title,
        amount,
        type,
        user: req.user,
      });

    res.status(201).json(
      expense
    );

  } catch (error) {

    res.status(500).json({
      message: "Server error",
    });

  }
};

// UPDATE EXPENSE
export const updateExpense = async (
  req,
  res
) => {
  try {

    const {
      title,
      amount,
      type,
    } = req.body;

    const expense =
      await Expense.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user,
        },
        {
          title,
          amount,
          type,
        },
        {
          new: true,
        }
      );

    res.json(expense);

  } catch (error) {

    res.status(500).json({
      message: "Server error",
    });

  }
};

// DELETE EXPENSE
export const deleteExpense = async (
  req,
  res
) => {
  try {

    await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    res.json({
      message:
        "Expense deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
    });

  }
};

// ANALYTICS SUMMARY
export const getAnalytics = async (
  req,
  res
) => {
  try {

    const expenses =
      await Expense.find({
        user: req.user,
      });

    let income = 0;
    let expenseTotal = 0;

    expenses.forEach(
      (item) => {

        if (
          item.type ===
          "Income"
        ) {

          income +=
            item.amount;

        } else {

          expenseTotal +=
            item.amount;

        }

      }
    );

    res.json({
      income,
      expense:
        expenseTotal,
      balance:
        income -
        expenseTotal,
    });

  } catch (error) {

    res.status(500).json({
      message:
        "Server error",
    });

  }
};