// import { useUploadProfileAvatarMutation } from '@/services/profile/profileApi'

import { useUploadProfileAvatarMutation } from '@/services/profile/profileAPi'

export const useUploadAvatars = () => {
  const [uploadAvatar, { error, isLoading, isSuccess }] = useUploadProfileAvatarMutation()

  return { error, isLoading, isSuccess, uploadAvatar }
}
