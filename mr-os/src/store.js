import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'
import orderReducer from './slices/orderSlice'
import userReducer from './slices/userDataSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    order: orderReducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})