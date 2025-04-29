export interface updatePostLikesRequest {
  likeStatus: 'DISLIKE' | 'LIKE' | 'NONE'
  postId: number
}

export interface getPostLikesRequest {
  cursor?: number
  pageNumber?: number
  pageSize?: number
  postId: number
  search?: string
}

export interface getCommentLikesRequest extends getPostLikesRequest {
  commentId: number
}

export interface updateCommentLikesRequest {
  commentId: number
  likeStatus: 'DISLIKE' | 'LIKE' | 'NONE'
  postId: number
}

export interface updateAnswerLikesRequest {
  answerId: number
  commentId: number
  likeStatus: 'DISLIKE' | 'LIKE' | 'NONE'
  postId: number
}

interface Avatars {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

export interface LikeItems {
  avatars: Avatars[]
  createdAt: string
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}

export interface GetPostLikesResponse {
  isLiked: boolean
  items: LikeItems[]
  nextCursor: null | number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}
