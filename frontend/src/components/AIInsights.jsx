function AIInsights({ getInsights, insight }) {
  return (
    <>
      <button onClick={getInsights}>
        Generate AI Insights
      </button>

      <p>{insight}</p>
    </>
  );
}

export default AIInsights;