import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type Notyfication = {
  clientId: string
  createdAt: string
  eventType: number
  id: number
  isRead: boolean
  message: string
  notifyAt: string
}

const paymentsNotifications = createSlice({
  initialState: {
    notifications: [] as Notyfication[],
  },
  name: 'paymentsNotifications',
  reducers: {
    addNotification: (state, action: PayloadAction<Notyfication>): void => {
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
