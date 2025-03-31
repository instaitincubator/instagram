import { From } from '@/shared/types/public.types'

export interface CreateAnswerRequest {
  commentId: number
  content: string
  postId: number
}

export interface GetCommentAnswerRequest {
  commentId: number
  postId: number
  sortDirection: 'asc' | 'desc'
}

export interface CreateAnswerResponse {
  commentId: number
  content: string
  createdAt: string
  from: From
  id: number
  isLiked: boolean
  likeCount: number
}

export interface Answer {
  commentId: number
  content: string
  createdAt: string
  from: From
  id: number
  isLiked: boolean
  likeCount: number
}

export interface GetCommentAnswerResponse {
  items: Answer[]
  notReadCount: number
  pageSize: number
  totalCount: number
}
