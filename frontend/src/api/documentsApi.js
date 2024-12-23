import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const documentsApi = {
  getDocuments: async (folderId) => {
    const token = localStorage.getItem('token');
    const url = folderId
      ? `${API_URL}/documents/folders/${folderId}`
      : `${API_URL}/documents`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  uploadDocument: async (folderId, formData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/documents/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        params: { folderId }
      }
    );
    return response.data;
  },

  createFolder: async (folderData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/documents/folders`,
      folderData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  },

  deleteDocument: async (documentId) => {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_URL}/documents/${documentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};
