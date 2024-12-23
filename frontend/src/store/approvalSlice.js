import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { approvalApi } from '../api/approvalApi';

// 결재 문서 생성
export const createDocument = createAsyncThunk(
  'approval/createDocument',
  async (documentData, { rejectWithValue }) => {
    try {
      const response = await approvalApi.createDocument(documentData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 결재 대기 문서 목록 조회
export const fetchPendingDocuments = createAsyncThunk(
  'approval/fetchPendingDocuments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await approvalApi.getPendingDocuments();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const approvalSlice = createSlice({
  name: 'approval',
  initialState: {
    documents: [],
    pendingDocuments: [],
    currentDocument: null,
    loading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDocument.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.documents.push(action.payload);
      })
      .addCase(createDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPendingDocuments.fulfilled, (state, action) => {
        state.pendingDocuments = action.payload;
      });
  }
});

export const { clearError } = approvalSlice.actions;
export default approvalSlice.reducer;
