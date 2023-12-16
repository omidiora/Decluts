
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { authApi } from './auth/api'
import productApi  from './product/api'
import authReducer from './auth'
import profileReducer  from './auth/profile'
import paymentReducer  from './payment/api'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]:authApi.reducer,
    auth: authReducer,
    product: productApi,
    profile:profileReducer,
    payment:paymentReducer
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
    .concat(authApi.middleware)
    
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch