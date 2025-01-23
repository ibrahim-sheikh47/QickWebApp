import apiClient from "../apiclient";
import endpoints from "../endpoints";

export const getAllUsers = async () => {
  try {
    const response = await apiClient.get(`${endpoints.user}/all`);
    return response.data;
  } catch (error) {
    throw error;
  }
};  

export const sendMail = async (body) => {
  try {
    const response = await apiClient.post(`${endpoints.user}/send-mail`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
