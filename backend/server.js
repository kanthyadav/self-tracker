import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(cors());

app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/expenses", expenseRoutes);

app.use("/api/ai", aiRoutes);

// DATABASE
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
  })
  .catch((err) => {
    console.log(err);
  });

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});