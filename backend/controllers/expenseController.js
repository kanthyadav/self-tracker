import Expense from "../models/Expense.js";

// GET ALL EXPENSES
export const getExpenses = async (
  req,
  res
) => {
  try {
    const expenses =
      await Expense.find({
        user: req.user,
      }).sort({
        createdAt: -1,
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

    if (!expense) {
      return res.status(404).json({
        message:
          "Expense not found",
      });
    }

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
    const expense =
      await Expense.findOneAndDelete(
        {
          _id: req.params.id,
          user: req.user,
        }
      );

    if (!expense) {
      return res.status(404).json({
        message:
          "Expense not found",
      });
    }

    res.json({
      message:
        "Expense deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

// ANALYTICS
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
    let expense = 0;

    expenses.forEach(
      (item) => {
        const type = String(
          item.type
        )
          .toLowerCase()
          .trim();

        console.log(
          "TYPE VALUE:",
          type
        );

        if (
          type === "income"
        ) {
          income += Number(
            item.amount
          );
        } else {
          expense += Number(
            item.amount
          );
        }
      }
    );

    console.log(
      "Income:",
      income
    );
    console.log(
      "Expense:",
      expense
    );

    res.json({
      income,
      expense,
      balance:
        income - expense,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Server error",
    });
  }
};