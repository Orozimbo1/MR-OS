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

    //Check for errors Front
    if(!user.displayName) {
      return thunkAPI.rejectWithValue('O campo "nome" é obrigatório.')
    } else if(user.displayName.length < 3) {
      return thunkAPI.rejectWithValue('O nome precisa ter no mínimo "3" caracteres.')
    } else if (!user.password) {
      return thunkAPI.rejectWithValue('O campo "senha" é obrigatório.')
    } else if (user.password.length < 6) {
      return thunkAPI.rejectWithValue('Senha precisa conter pelo menos "6" caracteres.')
    }

    const data = await authService.register(user)

    // Check for errors Firebase
    if(data.error && data.error.code.includes('already')) {
      return thunkAPI.rejectWithValue('Email já está em uso.')
    } else if (data.error && data.error.code.includes('invalid')) {
      return thunkAPI.rejectWithValue('Por favor insira um email válido.')
    }

    return data
  }
)

// Update an user
export const updateUser = createAsyncThunk(
  'auth/update',
  async (user, thunkAPI) => {

    const data = await authService.updateUser(user)

    return data
  }
)

// Sign in an user
export const login = createAsyncThunk(
  'auth/login',
  async (user, thunkAPI) => {

    const data = await authService.login(user)

    // Check for errors
    if(data.error) {
      return thunkAPI.rejectWithValue('Usuário ou senha incorretos.')
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
    .addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.user = action.payload;
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    })
    .addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.user = null;
    })
    .addCase(login.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.user = action.payload;
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    })
  }
})

export const { reset } = authSlice.actions;
export default authSlice.reducer;