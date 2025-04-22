import apiClient from "../apiclient";
import endpoints from "../endpoints";

export const getNotificationCounts = async () => {
  try {
    const response = await apiClient.get(endpoints.notifications + "/count");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllNotifications = async () => {
  try {
    const response = await apiClient.get(endpoints.notifications + "/all");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteNotification = async (id) => {
  try {
    const response = await apiClient.patch(
      `${endpoints.notifications}/delete/${id}`,
      {}
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const readNotification = async (id) => {
  try {
    const response = await apiClient.patch(
      `${endpoints.notifications}/read/${id}`,
      {}
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const clearAllNotifications = async () => {
  try {
    const response = await apiClient.patch(
      `${endpoints.notifications}/clear-all/`,
      {}
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const readAllNotification = async () => {
  try {
    const response = await apiClient.patch(
      `${endpoints.notifications}/read-all/`,
      {}
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
