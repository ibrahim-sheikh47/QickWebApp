import apiClient from "../apiclient";
import endpoints from "../endpoints";

export const login = async (body) => {
  try {
    const response = await apiClient.post(endpoints.login, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (body) => {
  try {
    const response = await apiClient.post(endpoints.signup, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (body) => {
  try {
    const response = await apiClient.post(endpoints.forgotPassword, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfile = async (body) => {
  try {
    const response = await apiClient.get(endpoints.getProfile);
    return response.data;
  } catch (error) {
    throw error;
  }
};
