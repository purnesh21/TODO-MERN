import axios from "axios";

const API_URL = import.meta.env || "http://localhost:5000/api/v1";

const api = axios.create({
  baseURL: API_URL,
});


export const getTodos = () => api.get("/todos");

// Add a new todo
export const addTodo = (todo) => api.post("/todos", todo);

// Update a todo
export const updateTodo = (id, todo) => api.put(`/todos/${id}`, todo);

// Delete a todo
export const deleteTodo = (id) => api.delete(`/todos/${id}`);

export default api;
