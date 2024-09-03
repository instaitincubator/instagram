import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { baseCityApi } from '@/app/cities-api'
import { googleReducer } from '@/app/googleSlice'
import { baseApi } from '@/services/inctagram-api'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware).concat(baseCityApi.middleware),
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [baseCityApi.reducerPath]: baseCityApi.reducer,
    google: googleReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
