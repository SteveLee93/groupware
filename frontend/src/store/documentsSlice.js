import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { documentsApi } from '../api/documentsApi';

export const fetchDocuments = createAsyncThunk(
  'documents/fetchDocuments',
  async (folderId, { rejectWithValue }) => {
    try {
      const response = await documentsApi.getDocuments(folderId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadDocument = createAsyncThunk(
  'documents/uploadDocument',
  async ({ folderId, formData }, { rejectWithValue }) => {
    try {
      const response = await documentsApi.uploadDocument(folderId, formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createFolder = createAsyncThunk(
  'documents/createFolder',
  async (folderData, { rejectWithValue }) => {
    try {
      const response = await documentsApi.createFolder(folderData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const documentsSlice = createSlice({
  name: 'documents',
  initialState: {
    documents: [],
    folders: [],
    currentFolder: null,
    loading: false,
    error: null
  },
  reducers: {
    setCurrentFolder: (state, action) => {
      state.currentFolder = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload.documents;
        state.folders = action.payload.folders;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadDocument.fulfilled, (state, action) => {
        state.documents.push(action.payload);
      })
      .addCase(createFolder.fulfilled, (state, action) => {
        state.folders.push(action.payload);
      });
  }
});

export const { setCurrentFolder, clearError } = documentsSlice.actions;
export default documentsSlice.reducer;
