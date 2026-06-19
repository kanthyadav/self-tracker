import express from "express";

import auth from "../middleware/authMiddleware.js";

import {
  generateInsights,
} from "../controllers/aiController.js";

const router = express.Router();

router.get(
  "/insights",
  auth,
  generateInsights
);

export default router;