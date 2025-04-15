import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student' | 'staff';
  studentId?: string;
  department?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;

// Async Actions
export const login = (email: string, password: string) => async (dispatch: any) => {
  try {
    dispatch(loginStart());
    const response = await axios.post('/api/auth/login', { email, password });
    dispatch(loginSuccess(response.data));
    localStorage.setItem('token', response.data.token);
  } catch (error: any) {
    dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
  }
};

export const register = (userData: any) => async (dispatch: any) => {
  try {
    dispatch(loginStart());
    const response = await axios.post('/api/auth/register', userData);
    dispatch(loginSuccess(response.data));
    localStorage.setItem('token', response.data.token);
  } catch (error: any) {
    dispatch(loginFailure(error.response?.data?.message || 'Registration failed'));
  }
};

export const loadUser = () => async (dispatch: any) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(loginSuccess({ user: response.data, token }));
    }
  } catch (error) {
    localStorage.removeItem('token');
  }
};

export default authSlice.reducer; 