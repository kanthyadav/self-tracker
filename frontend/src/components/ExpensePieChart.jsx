import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function ExpensePieChart({ token }) {
  const [analytics, setAnalytics] =
    useState({
      income: 0,
      expense: 0,
    });

  const API_URL =
    "https://self-tracker-1mv0.onrender.com";

  useEffect(() => {
    const fetchAnalytics =
      async () => {
        try {
          const res =
            await fetch(
              `${API_URL}/api/expenses/analytics`,
              {
                headers: {
                  Authorization:
                    token,
                },
              }
            );

          const data =
            await res.json();

          setAnalytics(data);
        } catch (error) {
          console.log(error);
        }
      };

    fetchAnalytics();
  }, [token]);

  const data = {
    labels: [
      "Income",
      "Expense",
    ],
    datasets: [
      {
        data: [
          analytics.income,
          analytics.expense,
        ],
      },
    ],
  };

  return (
    <div className="pie-chart-container">
      <h2 className="pie-chart-title">
        Expense Overview 
      </h2>

      <Pie data={data} />
    </div>
  );
}

export default ExpensePieChart;