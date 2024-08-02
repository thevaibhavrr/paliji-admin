import axios from "axios";

export const makeApi = async (
  endpoint,
  method = "GET",
  data
) => {
  try {
    const token = localStorage.getItem("token");
    

    if (!token && endpoint.includes("/auth-required")) {
      throw new Error("Please login to access this resource.");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    };

    const config = {
      method,
      url: `https://pajiweb.onrender.com${endpoint}`,
      // url: `https://sk-backend-uvv5.onrender.com${endpoint}`,
      // url:"http://localhost:7000"+endpoint,
      headers,
      data
    };

    const response = await axios(config);
    return response;
  } catch (error) {
    const message = error.response.data
		if(message.error === "Invalid Token.") {
			localStorage.clear()
			window.location.href = "/";
		}
    console.error("API request failed:", error.response.data);
    throw error;
  }
};
