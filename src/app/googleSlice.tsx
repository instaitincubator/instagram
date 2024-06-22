import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  initialState: {
    code: '',
  },
  name: 'google',
  reducers: {
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload
    },
  },
})

export const googleActions = slice.actions
export const googleReducer = slice.reducer
