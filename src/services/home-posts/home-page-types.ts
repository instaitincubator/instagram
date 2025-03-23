export interface homePagePostImages {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

interface Owner {
  firstName: string
  lastName: string
}

export interface HomePagePost {
  avatarOwner: string
  avatarWhoLikes: string[]
  createdAt: string
  description: string
  id: number
  images: homePagePostImages[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: Owner
  ownerId: number
  updatedAt: string
  userName: string
}

export interface homePageResponse {
  items: HomePagePost[]
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

export interface homePageRequest {
  endCursorPostId: number
  pageNumber: number
  pageSize: number
}
