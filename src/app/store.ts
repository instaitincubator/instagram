import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { authReducer } from '@/app/authSlice'
import { googleReducer } from '@/app/googleSlice'
import { baseApi } from '@/app/inctagram-api'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    google: googleReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
