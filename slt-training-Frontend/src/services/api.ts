// services/api.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8088/api';

export interface UserPayload {
  uid: string;
  module: string;
  DeviceCode: string;
}

export interface UpdateUserPayload {
  name: string;
  email: string;
  phone: string;
  departmentId: string;  // Changed from department to departmentId
  laptopSerial: string;
  deviceCode: string;
  uid: string;
  photo?: string;
  startDate: string;
  endDate: string;
  module: string;
}

export const userService = {
  insertUser: async (payload: UserPayload) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/insertUser`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (id: string, payload: UpdateUserPayload) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/user/${id}`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUsers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserByDevice: async (deviceCode: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/device/${deviceCode}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};