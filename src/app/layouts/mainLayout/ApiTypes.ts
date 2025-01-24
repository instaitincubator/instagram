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
