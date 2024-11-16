import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const api = {
  createContact: async (contactData) => {
    const response = await axios.post(`${API_URL}/contacts`, contactData);
    return response.data;
  },

  getContacts: async (
    page = 1,
    limit = 10,
    sortBy = "created_at",
    order = "DESC"
  ) => {
    const response = await axios.get(
      `${API_URL}/contacts?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`
    );
    return response.data;
  },

  updateContact: async (id, contactData) => {
    const response = await axios.put(`${API_URL}/contacts/${id}`, contactData);
    return response.data;
  },

  deleteContact: async (id) => {
    const response = await axios.delete(`${API_URL}/contacts/${id}`);
    return response.data;
  },
};
