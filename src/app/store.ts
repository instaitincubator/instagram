import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { baseApi } from '@/services/inctagram-api'
import { errorReduce } from '@/services/notification/error-notification'
import { Action, ThunkAction, ThunkDispatch, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

export const store = () =>
  configureStore({
    devTools: true,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      errorNotions: errorReduce,
    },
  })
export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const wrapper = createWrapper<AppStore>(store)
