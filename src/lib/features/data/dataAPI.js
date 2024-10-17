import { API_ROOT } from "@/constants/constants";

export const fetchDataFromAPI = async (key) => {
  try {
    const response = await fetch(`${API_ROOT}/api/v1/${key}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    
    if (!result) {
      throw new Error(`No data found for key: ${key}`);
    }

    return result;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
};
