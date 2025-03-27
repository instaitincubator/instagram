export interface LikesApiType {
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

interface Items {
  avatars: Avatars[]
  createdAt: string
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}

export interface GetAvatarResponse {
  isLiked: boolean
  items: Items[]
  nextCursor: null | number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}
