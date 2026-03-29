import express from "express";
import Expense from "../models/Expense.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ADD
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { title, amount, type, category } = req.body;

    const expense = new Expense({
      title,
      amount,
      type,
      category,
      user: req.user,
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET
router.get("/", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user }).sort({
      date: -1,
    });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;