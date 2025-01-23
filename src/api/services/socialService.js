import apiClient from "../apiclient";
import endpoints from "../endpoints";

export const getAllTeamsAndUsers = async () => {
  try {
    const response = await apiClient.get(`${endpoints.social}/teams-and-users`);
    return response.data;
  } catch (error) {
    throw error;
  }
};