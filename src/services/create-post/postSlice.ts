import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ImagesType = {
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
    setImage: (state, action: PayloadAction<ImagesType>): void => {

      state.images.push(action.payload)
    },
  },
})

export const imageActions = createImageSlice.actions
export const imageReduce = createImageSlice.reducer
