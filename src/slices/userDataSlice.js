import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userDataService from "../services/userDataService";

const initialState = {
  userData: {},
  error: false,
  loading: false,
  success: false,
}

// Register an user data
export const registerUserData = createAsyncThunk(
  'userdata/register',
  async (data, thunkAPI) => {

    const res = await userDataService.registerUserData(data)

    return res
  }
)

// Get an user data
export const getUserData = createAsyncThunk(
  'userdata/get',
  async (uid, thunkAPI) => {
    const res = await userDataService.getUserData(uid)

    return res
  }
)

// Update an user data 
export const updateUserData = createAsyncThunk(
  'userdata/update',
  async ({id, document}, thunkAPI) => {
    const data = await userDataService.updateUserData(id, document)

    return data
  }
)

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
    }
  },
  extraReducers: (builders) => {
    builders.addCase(registerUserData.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(registerUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.userData = action.payload;
    })
    .addCase(registerUserData.rejected, (state, action) => {
      state.loading = false;
      state.userData = null;
      state.error = action.payload;
    })
    .addCase(getUserData.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(getUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.userData = action.payload;
    })
    .addCase(getUserData.rejected, (state, action) => {
      state.loading = false;
      state.userData = null;
      state.error = action.payload;
    })
    .addCase(updateUserData.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(updateUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.userData = action.payload;
    })
    .addCase(updateUserData.rejected, (state, action) => {
      state.loading = false;
      state.userData = null;
      state.error = action.payload;
    })
  }
})

export const { reset } = userDataSlice.actions;
export default userDataSlice.reducer;