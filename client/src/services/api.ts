import axios from 'axios';
import type { TaskItem, CreateTaskRequest, UpdateTaskRequest } from '../types/task';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskApi = {
  // Get all tasks
  getTasks: async (): Promise<TaskItem[]> => {
    const response = await api.get('/Tasks');
    return response.data;
  },

  // Get a single task by ID
  getTask: async (id: number): Promise<TaskItem> => {
    const response = await api.get(`/Tasks/${id}`);
    return response.data;
  },

  // Create a new task
  createTask: async (task: CreateTaskRequest): Promise<TaskItem> => {
    const response = await api.post('/Tasks', task);
    return response.data;
  },

  // Update an existing task
  updateTask: async (id: number, task: UpdateTaskRequest): Promise<void> => {
    await api.put(`/Tasks/${id}`, { ...task, id });
  },

  // Delete a task
  deleteTask: async (id: number): Promise<void> => {
    await api.delete(`/Tasks/${id}`);
  },
};

export default api; 