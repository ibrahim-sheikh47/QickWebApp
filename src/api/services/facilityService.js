import apiClient from "../apiclient";
import endpoints from "../endpoints";

export const createFacility = async (body, userId) => {
  try {
    const response = await apiClient.post(
      `${endpoints.facilities}/${userId}`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editFacility = async (body, facilityId) => {
  try {
    const response = await apiClient.patch(
      `${endpoints.facilities}/${facilityId}`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFacilities = async (userId) => {
  try {
    const response = await apiClient.get(`${endpoints.facilities}/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createFacilityRules = async (body, facilityId) => {
  try {
    const response = await apiClient.post(
      `${endpoints.facilityRules}/${facilityId}`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFacilityRules = async (facilityId) => {
  try {
    const response = await apiClient.get(
      `${endpoints.facilityRules}/${facilityId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateFacilityRules = async (body, facilityRulesId) => {
  try {
    const response = await apiClient.patch(
      `${endpoints.facilityRules}/${facilityRulesId}`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFacilityRules = async (facilityRulesId) => {
  try {
    const response = await apiClient.delete(
      `${endpoints.facilityRules}/${facilityRulesId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createFacilityField = async (body, facilityId) => {
  try {
    const response = await apiClient.post(
      `${endpoints.fields}/${facilityId}`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFacilityFields = async (facilityId) => {
  try {
    const response = await apiClient.get(`${endpoints.fields}/${facilityId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFacilityFields = async (fieldId) => {
  try {
    const response = await apiClient.delete(`${endpoints.fields}/${fieldId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
