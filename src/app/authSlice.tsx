import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  initialState: {
    accessToken: '',
  },
  name: 'auth',
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
  },
})

export const authActions = slice.actions
export const authReducer = slice.reducer
