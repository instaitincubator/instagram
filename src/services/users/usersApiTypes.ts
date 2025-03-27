import { Avatars } from '@/shared/types/ApiTypes/ProfileApiTypes'

export interface getUsersParams {
  cursor: number
  pageNumber: number
  pageSize: number
  search: string
}

export type Items = {
  avatars: Avatars[]
  createdAt: string
  firstName: string
  id: number
  lastName: string
  userName: string
}

export type getUsers = {
  items: Items[]
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}
export interface UserWithFollowingStatusResponse {
  aboutMe: string
  avatars: Avatars[]
  city: string
  country: string
  dateOfBirth: string
  firstName: string
  followersCount: number
  followingCount: number
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  lastName: string
  publicationsCount: number
  region: string
  userName: string
}
