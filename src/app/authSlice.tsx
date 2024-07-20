import { MeResponse } from '@/shared/types/ApiTypes/AuthApiTypes'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  initialState: {
    isAuth: false,
    me: {} as MeResponse,
  },
  name: 'auth',
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
    setMe: (state, action: PayloadAction<MeResponse>) => {
      state.me = action.payload
    },
  },
})

export const authActions = slice.actions
export const authReducer = slice.reducer
