import apiClient from "../apiclient";
import endpoints from "../endpoints";

export const getFieldsBookingStats = async (facilityId, query = "") => {
  try {
    const response = await apiClient.get(
      `${endpoints.bookingStats}/${facilityId}?${query}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllBookings = async (query = "") => {
  try {
    const response = await apiClient.get(`${endpoints.booking}/all?${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createBooking = async (body) => {
  try {
    const response = await apiClient.post(`${endpoints.booking}`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBooking = async (body, bookingId) => {
  try {
    const response = await apiClient.patch(
      `${endpoints.booking}/${bookingId}`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    const response = await apiClient.patch(
      `${endpoints.booking}/cancel-booking/${bookingId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
