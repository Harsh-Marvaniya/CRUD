import axios from "axios";

const API_URL = "http://localhost:5000";

export const getUsers = async () => axios.get(`${API_URL}/users`);
export const addUser = async (user) => axios.post(`${API_URL}/users`, user);
export const updateUser = async (id, user) => axios.put(`${API_URL}/users/${id}`, user);
export const deleteUser = async (id) => axios.delete(`${API_URL}/users/${id}`);
