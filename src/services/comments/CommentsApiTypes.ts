import { Avatars } from '@/shared/types/ApiTypes/ProfileApiTypes'

export interface Commentator {
  avatars: Avatars[]
  id: number
  username: string
}

export interface CreateCommentResponse {
  answerCount: number
  content: string
  createdAt: string
  from: Commentator
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}

export interface CreateCommentRequest {
  content: string
  postId: number
}

export interface GetAllPostCommentsRequest {
  pageNumber?: number
  pageSize?: number
  postId: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

export interface Comments {
  answerCount: number
  content: string
  createdAt: string
  from: Commentator
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}

export interface GetAllPostCommentsResponse {
  items: Comments[]
  notReadCount: number
  pageSize: number
  totalCount: number
}
