import { AppDispatch } from '@/app/store'

export const saveImageHook = async (image: string) => {
  const response = await fetch(image)
  const blob = await response.blob()
  const file = new File([blob], 'temp.img', { type: blob.type })
  const imageData = new FormData()

  imageData.append('file', file)

  return imageData
}
