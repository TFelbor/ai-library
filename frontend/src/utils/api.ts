import { ResourceSubmission } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  async submitResource(resource: ResourceSubmission) {
    const response = await fetch(`${API_BASE_URL}/resources/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resource),
    });

    if (!response.ok) throw new Error('Failed to submit resource');
    return response.json();
  },

  async getApprovedResources() {
    console.log('Fetching approved resources from:', `${API_BASE_URL}/resources/approved`);
    try {
      const response = await fetch(`${API_BASE_URL}/resources/approved`);
      console.log('Response status:', response.status);

      if (!response.ok) {
        console.error('Failed to fetch resources:', response.statusText);
        throw new Error(`Failed to fetch resources: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Received approved resources:', data);
      return data;
    } catch (error) {
      console.error('Error in getApprovedResources:', error);
      throw error;
    }
  },

  async getPendingResources(token: string) {
    const response = await fetch(`${API_BASE_URL}/resources/pending`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch pending resources');
    return response.json();
  },

  async verifyResource(resourceId: string, status: 'approved' | 'rejected', token: string) {
    const response = await fetch(`${API_BASE_URL}/resources/${resourceId}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to verify resource');
    return response.json();
  },
};