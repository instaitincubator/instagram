import { baseApi } from '@/services/inctagram-api'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type NotificationState = {
  error: boolean
  message: string
}

const errorNotification = createSlice({
  initialState: {} as NotificationState,
  name: 'notification',
  reducers: {
    setError: (state, action: PayloadAction<boolean>): void => {
      state.error = action.payload
    },
    setMessage: (state, action: PayloadAction<string>): void => {
      state.message = action.payload
    },
  },
})

export const errorActions = errorNotification.actions
export const errorReduce = errorNotification.reducer
