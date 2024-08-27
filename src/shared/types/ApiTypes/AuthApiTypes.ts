export interface MeResponse {
  email: string
  isBlocked: boolean
  userId: number
  userName: string
}
export interface LoginArgs {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
}
