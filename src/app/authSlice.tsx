import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  initialState: {
    accessToken: '',
    isAuth: false,
  },
  name: 'auth',
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
  },
})

export const authActions = slice.actions
export const authReducer = slice.reducer
