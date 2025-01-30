import { PaymentNotyfication } from '@/app/layouts/mainLayout/types/ApiTypes'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const paymentsNotifications = createSlice({
  initialState: {
    notifications: [] as PaymentNotyfication[],
  },
  name: 'paymentsNotifications',
  reducers: {
    addNotification: (state, action: PayloadAction<PaymentNotyfication>): void => {
      state.notifications.push(action.payload)
    },
    deleteNotification: (state, action: PayloadAction<number>): void => {
      const noticeIndex = state.notifications.findIndex(item => item.id === action.payload)

      state.notifications.splice(noticeIndex, 1)
    },
  },
})

export const paymentsNotificationsActions = paymentsNotifications.actions
export const paymentsNotificationsReducer = paymentsNotifications.reducer
