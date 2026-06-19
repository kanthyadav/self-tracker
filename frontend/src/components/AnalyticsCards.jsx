import { useEffect, useState } from "react";

function AnalyticsCards({ token }) {
  const [analytics, setAnalytics] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const API_URL =
    "https://self-tracker-1mv0.onrender.com";

  const fetchAnalytics = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/expenses/analytics`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = await res.json();

      console.log(
        "Analytics Response:",
        data
      );

      alert(
        JSON.stringify(data)
      );

      setAnalytics(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAnalytics();
    }
  }, [token]);

  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        marginBottom: "20px",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          border: "1px solid #ddd",
          padding: "15px",
          borderRadius: "8px",
          minWidth: "150px",
        }}
      >
        <h3>Income</h3>
        <p>₹{analytics.income}</p>
      </div>

      <div
        style={{
          border: "1px solid #ddd",
          padding: "15px",
          borderRadius: "8px",
          minWidth: "150px",
        }}
      >
        <h3>Expense</h3>
        <p>₹{analytics.expense}</p>
      </div>

      <div
        style={{
          border: "1px solid #ddd",
          padding: "15px",
          borderRadius: "8px",
          minWidth: "150px",
        }}
      >
        <h3>Balance</h3>
        <p>₹{analytics.balance}</p>
      </div>
    </div>
  );
}

export default AnalyticsCards;