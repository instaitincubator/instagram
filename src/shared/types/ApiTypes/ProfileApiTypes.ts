export type Avatars = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

export interface ProfileInfo {
  aboutMe: string
  avatars: Avatars[]
  city: string
  country: string
  createdAt: string
  dateOfBirth: Date
  firstName: string
  id: number
  lastName: string
  region: string
  userName: string
}

export type Items = {
  avatars: Avatars[]
  createdAt: string
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}

export type ProfileFollowers = {
  items: Items
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

export type ProfileFollowing = {
  items: Items
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

export type Images = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export type Owner = {
  firstName: string
  lastName: string
}

export type PostsItems = {
  avatarOwner: string
  createdAt: string
  description: string
  id: number
  images: Images[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: Owner
  ownerId: number
  updatedAt: string
  userName: string
}

export type ProfilePosts = {
  items: PostsItems[]
  pageSize: number
  totalCount: number
}

export interface GetProfilePostsParams {
  pageNumber?: number
  pageSize?: number
  sortBy?: 'asc' | 'desc'
  sortDirection?: 'asc' | 'desc'
  userName: string
}
