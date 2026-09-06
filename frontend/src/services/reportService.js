import axios from "axios";

const API = "http://localhost:5000/api/dashboard";

export const getReport = async () => {
  return await axios.get(`${API}/report`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};