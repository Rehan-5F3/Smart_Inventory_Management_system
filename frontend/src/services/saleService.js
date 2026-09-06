import axios from "axios";

const API = "http://localhost:5000/api/sales";

export const createSale = (saleData) => {
  const token = localStorage.getItem("token");

  console.log("SALE TOKEN:", token);

  return axios.post(API, saleData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSales = () => {
  const token = localStorage.getItem("token");

  return axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};