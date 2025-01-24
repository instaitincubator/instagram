export type GetNotificationResponse = {
  items: GetNotificationItems[]
  notReadCount: number
  pageSize: number
  totalCount: number
}
type GetNotificationItems = {
  createdAt: string
  id: number
  isRead: boolean
  message: string
}
export type MarkAsUpdatedRequest = {
  id: number[]
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
