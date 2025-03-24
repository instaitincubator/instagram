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
