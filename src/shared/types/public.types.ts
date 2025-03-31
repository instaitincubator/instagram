import { PostsPublicItems } from '@/shared/types/ApiTypes/ProfileApiTypes'

export type Images = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export type ImagesType = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}
export type CreatePostState = {
  images: ImagesType[]
  message?: string
}
export type PostCardProps = {
  openModal: (post: PostsPublicItems) => void
  post: PostsPublicItems
}
export type UploadType = {
  uploadId: string
}
export type CreatePost = {
  childrenMetadata: UploadType[]
  description: string
}
type PostView = {
  avatarOwner: string
  avatarWhoLikes: string[]
  createdAt: string
  description: string
  id: number
  images: any
  isLiked: boolean
  likesCount: number
  location: string
  owner: any
  ownerId: number
  updatedAt: string
  userName: string
}

export interface From {
  avatars: ProfileAvatars[]
  id: number
  username: string
}

export interface SingleComment {
  answerCount: number
  content: string
  createdAt: string
  from: From
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}

export interface CommentForPost {
  items: SingleComment[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}

export type CountRegisteredUsersProps = {
  count: number | undefined
}
export type Profile = {
  avatars: ProfileAvatars[]
  city: string
  country: string
  createdAt: string
  dateOfBirth: string
  firstName: string
  id: number
  lastName: string
  userName: string
}
export type ProfileAvatars = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

export type AllPublicPosts = {
  items: PostsPublicItems[]
  pageSize: number
  totalCount: number
  totalUsers: number
}

export interface GetTotalUsersResponse {
  lastUserId: number
  totalCount: number
}

export interface Payment {
  dateOfPayment: string
  endDateOfSubscription: string
  paymentType: string
  price: number
  subscriptionType: string
}
