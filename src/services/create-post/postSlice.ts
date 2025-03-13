import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type ImagesType = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}
type CreatePostState = {
  images: ImagesType[]
  message?: string
}
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
