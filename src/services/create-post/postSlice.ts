import { CreatePostState, ImagesType } from '@/shared/types/public.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: CreatePostState = {
  images: [],
  message: undefined,
}
const createImageSlice = createSlice({
  initialState,
  name: 'createPost',
  reducers: {
    deleteState: (state): void => {
      state.images = []
      state.message = undefined
    },
    removeImage: (state, action: PayloadAction<string>): void => {
      state.images = state.images.filter(image => image.uploadId !== action.payload)
    },
    setImage: (state, action: PayloadAction<ImagesType>): void => {
      state.images.push(action.payload)
    },
  },
})

export const imageActions = createImageSlice.actions
export const imageReduce = createImageSlice.reducer
