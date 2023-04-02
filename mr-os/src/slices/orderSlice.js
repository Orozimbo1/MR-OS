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
  }
})

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;