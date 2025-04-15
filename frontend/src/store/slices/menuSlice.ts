import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  preparationTime: number;
}

interface MenuState {
  items: MenuItem[];
  categories: string[];
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  items: [],
  categories: [],
  loading: false,
  error: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    fetchMenuStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMenuSuccess: (state, action: PayloadAction<MenuItem[]>) => {
      state.loading = false;
      state.items = action.payload;
      state.categories = [...new Set(action.payload.map((item) => item.category))];
      state.error = null;
    },
    fetchMenuFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addMenuItem: (state, action: PayloadAction<MenuItem>) => {
      state.items.push(action.payload);
      if (!state.categories.includes(action.payload.category)) {
        state.categories.push(action.payload.category);
      }
    },
    updateMenuItem: (state, action: PayloadAction<MenuItem>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteMenuItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  fetchMenuStart,
  fetchMenuSuccess,
  fetchMenuFailure,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = menuSlice.actions;

// Async Actions
export const fetchMenuItems = () => async (dispatch: any) => {
  try {
    dispatch(fetchMenuStart());
    const response = await axios.get('/api/menu');
    dispatch(fetchMenuSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchMenuFailure(error.response?.data?.message || 'Failed to fetch menu items'));
  }
};

export const createMenuItem = (itemData: Omit<MenuItem, 'id'>) => async (dispatch: any) => {
  try {
    const response = await axios.post('/api/menu', itemData);
    dispatch(addMenuItem(response.data));
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create menu item');
  }
};

export const updateMenuItemById = (id: string, itemData: Partial<MenuItem>) => async (dispatch: any) => {
  try {
    const response = await axios.put(`/api/menu/${id}`, itemData);
    dispatch(updateMenuItem(response.data));
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update menu item');
  }
};

export const deleteMenuItemById = (id: string) => async (dispatch: any) => {
  try {
    await axios.delete(`/api/menu/${id}`);
    dispatch(deleteMenuItem(id));
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete menu item');
  }
};

export default menuSlice.reducer; 