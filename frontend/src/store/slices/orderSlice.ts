import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface OrderItem {
  menuItem: {
    id: string;
    name: string;
    price: number;
  };
  quantity: number;
}

interface Order {
  id: string;
  user: {
    id: string;
    name: string;
  };
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  createdAt: string;
}

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    fetchOrdersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (state, action: PayloadAction<Order[]>) => {
      state.loading = false;
      state.orders = action.payload;
      state.error = null;
    },
    fetchOrdersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createOrderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createOrderSuccess: (state, action: PayloadAction<Order>) => {
      state.loading = false;
      state.currentOrder = action.payload;
      state.orders.push(action.payload);
      state.error = null;
    },
    createOrderFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateOrderStatus: (state, action: PayloadAction<{ id: string; status: Order['status'] }>) => {
      const order = state.orders.find((o) => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
});

export const {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  createOrderStart,
  createOrderSuccess,
  createOrderFailure,
  updateOrderStatus,
  clearCurrentOrder,
} = orderSlice.actions;

// Async Actions
export const fetchOrders = () => async (dispatch: any) => {
  try {
    dispatch(fetchOrdersStart());
    const response = await axios.get('/api/orders');
    dispatch(fetchOrdersSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchOrdersFailure(error.response?.data?.message || 'Failed to fetch orders'));
  }
};

export const createOrder = (orderData: { items: OrderItem[]; pickupTime: string }) => async (dispatch: any) => {
  try {
    dispatch(createOrderStart());
    const response = await axios.post('/api/orders', orderData);
    dispatch(createOrderSuccess(response.data));
  } catch (error: any) {
    dispatch(createOrderFailure(error.response?.data?.message || 'Failed to create order'));
  }
};

export const updateOrderStatusById = (id: string, status: Order['status']) => async (dispatch: any) => {
  try {
    await axios.put(`/api/orders/${id}/status`, { status });
    dispatch(updateOrderStatus({ id, status }));
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update order status');
  }
};

export default orderSlice.reducer; 