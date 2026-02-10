import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi } from '../../services/api';

const getInitialToken = () => localStorage.getItem('accessToken');

const initialState = {
  accessToken: getInitialToken(),
  loading: false,
  error: null,
  infoMessage: null,
};

export const login = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const data = await authApi.login(payload);
    return data.access;
  } catch (error) {
    return rejectWithValue(error.response?.data?.detail || 'Unable to login.');
  }
});

export const requestPasswordReset = createAsyncThunk(
  'auth/requestPasswordReset',
  async (payload, { rejectWithValue }) => {
    try {
      await authApi.forgotPassword(payload.email);
      return 'If the account exists, reset instructions have been sent.';
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to request reset email.');
    }
  },
);

export const confirmPasswordReset = createAsyncThunk(
  'auth/confirmPasswordReset',
  async (payload, { rejectWithValue }) => {
    try {
      await authApi.resetPassword(payload);
      return 'Password reset complete. Please login with your new password.';
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Password reset failed.');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.error = null;
      state.infoMessage = null;
    },
    logout: (state) => {
      state.accessToken = null;
      state.error = null;
      state.infoMessage = null;
      localStorage.removeItem('accessToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload;
        localStorage.setItem('accessToken', action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(requestPasswordReset.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.infoMessage = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state, action) => {
        state.loading = false;
        state.infoMessage = action.payload;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(confirmPasswordReset.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.infoMessage = null;
      })
      .addCase(confirmPasswordReset.fulfilled, (state, action) => {
        state.loading = false;
        state.infoMessage = action.payload;
      })
      .addCase(confirmPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearStatus, logout } = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectIsAuthenticated = (state) => Boolean(state.auth.accessToken);

export default authSlice.reducer;
