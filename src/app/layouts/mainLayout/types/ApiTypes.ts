export type GetNotificationResponse = {
  items: NotificationItem[]
  notReadCount: number
  pageSize: number
  totalCount: number
}
export type NotificationItem = {
  createdAt: string
  id: number
  isRead: boolean
  message: string
}

export type Messages = {
  field: string
  message: string
}

export type ErrorResponse = {
  error: string
  messages: Messages[]
  statusCode: number
}
export type MarkAsReadRequest = {
  ids: number[]
}
export type getNotificationParams = {
  cursor?: number
  isRead?: boolean
  pageSize?: number
  sortBy?: 'notifyAt'
  sortDirection?: 'asc' | 'desc'
}

export type PaymentNotyfication = {
  clientId?: string
  eventType?: number
  notifyAt?: string
} & NotificationItem
