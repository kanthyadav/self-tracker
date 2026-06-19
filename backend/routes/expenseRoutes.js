import express from "express";

import auth from "../middleware/authMiddleware.js";

import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  getAnalytics,
} from "../controllers/expenseController.js";

const router = express.Router();

// GET ALL EXPENSES
router.get(
  "/",
  auth,
  getExpenses
);

// ANALYTICS
router.get(
  "/analytics",
  auth,
  getAnalytics
);

// ADD EXPENSE
router.post(
  "/add",
  auth,
  addExpense
);

// UPDATE EXPENSE
router.put(
  "/:id",
  auth,
  updateExpense
);

// DELETE EXPENSE
router.delete(
  "/:id",
  auth,
  deleteExpense
);

export default router;