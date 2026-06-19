const BASE_URL = "http://localhost:5000";

export const getAIInsightsService =
  async (token) => {

    const res = await fetch(
      `${BASE_URL}/api/ai/insights`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return res.json();
  };