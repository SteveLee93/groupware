import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const calendarApi = {
  getEvents: async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/calendar/events`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  createEvent: async (eventData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/calendar/events`, eventData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  updateEvent: async (eventId, eventData) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/calendar/events/${eventId}`, eventData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  deleteEvent: async (eventId) => {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_URL}/calendar/events/${eventId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};
