import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../services/authService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  error: false,
  loading: false,
  success: false,
}


// Register an user and sign in
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {

    const data = await authService.register(user)

    //Check for errors
    if(data.error.code.includes('already')) {
      return thunkAPI.rejectWithValue('Email já está em uso.')
    } else if (data.error.code.includes('password')) {
      return thunkAPI.rejectWithValue('Senha precisa conter pelo menos 6 caracteres.')
    } else if (data.error.code.includes('invalid')) {
      return thunkAPI.rejectWithValue('Por favor insira um email válido.')
    }
    
    return data
  }
)

// Logout an user
export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await authService.logout()
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
    }
  },
  extraReducers: (builders) => {
    builders.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.user = action.payload;
    })
    .addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    })
    .addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.user = null;
    })
  }
})

export const { reset } = authSlice.actions;
export default authSlice.reducer;