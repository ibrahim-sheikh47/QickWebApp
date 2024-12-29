import apiClient from "../apiclient";
import endpoints from "../endpoints";

export const createVoucher = async (body) => {
  try {
    const response = await apiClient.post(`${endpoints.dicounts}`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateVoucherById = async (body, voucherId) => {
  try {
    const response = await apiClient.put(
      `${endpoints.dicounts}/${voucherId}`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteVoucher = async (voucherId) => {
  try {
    const response = await apiClient.delete(
      `${endpoints.dicounts}/${voucherId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllVouchers = async (facilityId) => {
  try {
    const response = await apiClient.get(`${endpoints.dicounts}/${facilityId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
