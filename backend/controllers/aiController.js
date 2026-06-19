import { GoogleGenerativeAI } from "@google/generative-ai";

import Expense from "../models/Expense.js";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

export const generateInsights = async (
  req,
  res
) => {
  try {

    const expenses = await Expense.find({
      user: req.user,
    });

    const model =
      genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

    const prompt = `
    Analyze these expenses and give smart financial insights and saving suggestions.

    Expenses:
    ${JSON.stringify(expenses)}
    `;

    const result =
      await model.generateContent(prompt);

    const response =
      result.response.text();

    res.json({
      insight: response,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "AI error",
    });

  }
};