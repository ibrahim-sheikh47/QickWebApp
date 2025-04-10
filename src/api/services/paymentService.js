import apiClient from "../apiclient";
import endpoints from "../endpoints";

export const addBankAccount = async (body) => {
  try {
    const response = await apiClient.post(
      `${endpoints.payment}/add-bank-account`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBankAccounts = async (facilityId) => {
  try {
    const response = await apiClient.get(
      `${endpoints.payment}/get-bank-accounts/${facilityId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBankAccount = async (body) => {
  try {
    const response = await apiClient.post(
      `${endpoints.payment}/delete-bank-account`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
