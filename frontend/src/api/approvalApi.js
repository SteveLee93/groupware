import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const approvalApi = {
  createDocument: async (documentData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/approval/documents`, documentData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getPendingDocuments: async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/approval/documents/pending`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  approveDocument: async (documentId, decision) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/approval/documents/${documentId}/approve`, decision, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};
