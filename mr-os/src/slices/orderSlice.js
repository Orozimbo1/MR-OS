import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "../services/orderService";

const initialState = {
  orders: [],
  order: {},
  error: false,
  loading: false,
  success: false,
}

// Register a new service order
export const newOrder = createAsyncThunk(
  'order/register',
  async (order, thunkAPI) => {

    const data = await orderService.newOrder(order)

    return data
  }
)

// Get a service orders
export const getServiceOrder = createAsyncThunk(
  'order/get',
  async (id, thunkAPI) => {
    const data = await orderService.getAllServiceOrders(id)

    return data
  }
)

// Get all service orders
export const getAllServiceOrders = createAsyncThunk(
  'order/getall',
  async (uid, thunkAPI) => {
    const data = await orderService.getAllServiceOrders(uid)

    return data
  }
)

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
    }
  },
  extraReducers: (builders) => {
    builders.addCase(newOrder.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(newOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.order = action.payload;
    })
    .addCase(newOrder.rejected, (state, action) => {
      state.loading = false;
      state.order = null;
      state.error = action.payload;
    })
    .addCase(getAllServiceOrders.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(getAllServiceOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.orders = action.payload;
    })
    .addCase(getAllServiceOrders.rejected, (state, action) => {
      state.loading = false;
      state.order = null;
      state.error = action.payload;
    })
    .addCase(getServiceOrder.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(getServiceOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.order = action.payload;
    })
    .addCase(getServiceOrder.rejected, (state, action) => {
      state.loading = false;
      state.order = null;
      state.error = action.payload;
    })
  }
})

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;