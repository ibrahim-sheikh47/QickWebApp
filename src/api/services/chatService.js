import apiClient from "../apiclient";
import endpoints from "../endpoints";

export const createChat = async (body) => {
  try {
    const response = await apiClient.post(
      `${endpoints.chats}/create-chat`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getChatsList = async () => {
  try {
    const response = await apiClient.get(`${endpoints.chats}/get-chat-list`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getChatById = async (chatId) => {
  try {
    const response = await apiClient.get(
      `${endpoints.chats}/get-chat/${chatId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getChatMessages = async (chatId) => {
  try {
    const response = await apiClient.get(
      `${endpoints.chats}/get-messages/${chatId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loadMoreMessages = async (chatId) => {
  try {
    const response = await apiClient.get(
      `${endpoints.chats}/load-more-messages/${chatId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendMessage = async (body) => {
  try {
    const response = await apiClient.post(
      `${endpoints.chats}/send-message`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const saveCommunicationHistory = async (body) => {
  try {
    const response = await apiClient.post(
      `${endpoints.chats}/save-communication-history`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCommunicationHistory = async () => {
  try {
    const response = await apiClient.get(
      `${endpoints.chats}/get-communication-history`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
