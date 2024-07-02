// export const apiService = async (path, method, body) => {
//     console.log(method, body)
//     const response = await fetch('http://localhost:4000/api/'+ path, {
//         method: method,
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body),
//     });
//     return response;
// }

import axios from 'axios';
import { getSessionData } from '../service/session';

const BASE_URL = 'http://localhost:4000/api/';
const sessionData = getSessionData() || null; // Assuming you have session data or null

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'authorization' : sessionData ? `Bearer ${sessionData}` : undefined,
    'Content-Type': 'application/json'
  }
});

export const getMethod = async (path) => {
  try {
    const response = await api.get(path);
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const postMethod = async (path, data) => {
  try {
    const response = await api.post(path, data);
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};

export const putMethod = async (path, updatedItem) => {
  try {
    const response = await api.put(path, updatedItem);
    return response.data;
  } catch (error) {
    console.error(`Error updating Method with ID ${path}:`, error);
    throw error;
  }
};

export const deleteItem = async (path) => {
  try {
    const response = await api.delete(path);
    return response.data;
  } catch (error) {
    console.error(`Error deleting item with ID ${path}:`, error);
    throw error;
  }
};
