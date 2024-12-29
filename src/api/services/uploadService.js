import apiClient from "../apiclient";
import endpoints from "../endpoints";

export const uploadFile = async (body) => {
  try {
    const response = await apiClient.post(endpoints.uploadFile, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
