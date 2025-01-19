export type Avatars = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}
export interface ProfileInfoPublic {
  aboutMe: string
  avatars: Avatars[]
  id: number
  userMetadata: UserMetadata
  userName: string
}

export interface UserMetadata {
  followers: number
  following: number
  publications: number
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
export interface Device {
  browserName: string
  browserVersion: string
  deviceId: number
  deviceName: string
  deviceType: string
  ip: string
  lastActive: string
  osName: string
  osVersion: string
}
export interface Session {
  current: Device
  others: Array<Device>
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
export type PostsPublicItems = {
  avatarOwner: string
  avatarWhoLikes: string[]
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
export type ProfilePublicPosts = {
  items: PostsPublicItems[]
  pageSize: number
  totalCount: number
  totalUsers: number
}
export interface GetProfilePostsParams {
  pageNumber?: number
  pageSize?: number
  sortBy?: 'asc' | 'desc'
  sortDirection?: 'asc' | 'desc'
  userName: string
}
export interface GetPublicProfilePostsParams {
  endCursorPostId?: number
  pageSize?: number
  sortBy?: 'asc' | 'desc'
  sortDirection?: 'asc' | 'desc'
  userId: string
}
