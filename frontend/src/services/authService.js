import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const loginUser = (userData) => {
  return axios.post(`${API}/login`, userData);
};