import axios from "axios";

const API = "http://localhost:5000/api/products";

export const addProduct = (productData) => {
  const token = localStorage.getItem("token");

  return axios.post(API, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
export const getProducts = () => {
  const token = localStorage.getItem("token");

  return axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProduct = (id) => {
  const token = localStorage.getItem("token");

  return axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProduct = (id, productData) => {
  const token = localStorage.getItem("token");

  return axios.put(`${API}/${id}`, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};