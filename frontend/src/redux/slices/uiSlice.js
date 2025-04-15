import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toast: {
    open: false,
    message: '',
    severity: 'info', // 'success' | 'error' | 'warning' | 'info'
  },
  loading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.toast = {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity || 'info',
      };
    },
    clearToast: (state) => {
      state.toast = initialState.toast;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { showToast, clearToast, setLoading } = uiSlice.actions;
export default uiSlice.reducer; 