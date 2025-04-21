import { ProfileAvatars } from '@/shared/types/public.types'

export interface ChatMessage {
  avatars: ProfileAvatars[]
  createdAt: string
  id: number
  messageText: string
  messageType: 'TEXT'
  ownerId: number
  receiverId: number
  status: 'READ' | 'SENT'
  updatedAt: string
  userName: string
}

export interface GetLatestMessagesResponse {
  items: ChatMessage[]
  notReadCount: number
  pageSize: number
  totalCount: number
}
export interface GetLatestMessagesRequest {
  cursor: number
  pageSize: number
  searchName: string
}
