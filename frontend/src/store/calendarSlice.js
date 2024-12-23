import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { calendarApi } from '../api/calendarApi';

export const fetchEvents = createAsyncThunk(
  'calendar/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await calendarApi.getEvents();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createEvent = createAsyncThunk(
  'calendar/createEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await calendarApi.createEvent(eventData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [],
    selectedEvent: null,
    loading: false,
    error: null
  },
  reducers: {
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      });
  }
});

export const { setSelectedEvent, clearError } = calendarSlice.actions;
export default calendarSlice.reducer;
