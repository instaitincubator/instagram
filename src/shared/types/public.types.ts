import { PostsPublicItems } from '@/shared/types/ApiTypes/ProfileApiTypes'

export type Images = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export type PostCardProps = {
  openModal: (post: PostsPublicItems) => void
  post: PostsPublicItems
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
