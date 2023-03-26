import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "../services/orderService";

const order = JSON.parse(localStorage.getItem('order'))

const initialState = {
  order: order ? order : null,
  error: false,
  loading: false,
  success: false,
}

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

  }
})

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;