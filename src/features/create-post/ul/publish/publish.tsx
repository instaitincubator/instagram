import React from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store'
import { PostImage } from '@/entities/PostImage/PostImage'
import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import { usePublicationForm } from '@/features/publication-form/usePublicationForm'
import { useMeQuery } from '@/services/auth/signInApi'
import { imageActions } from '@/services/create-post/postSlice'
import { useGetCreatePostMutation } from '@/services/profile/postsApi'
import { useGetProfileInfoQuery } from '@/services/profile/profileApi'
import { CreatePost, UploadType } from '@/shared/types/public.types'
import { ControlledTextarea } from '@/shared/ui'
import Button from '@/shared/ui/Button/Button'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface Props {
  backStep: () => void
}

export const Publish = ({ backStep }: Props) => {
  const { data: me } = useGetProfileInfoQuery()
  const { data: myUserId } = useMeQuery()
  const { images } = useAppSelector(state => state.imageSlice)
  const { control, errors, handleSubmit } = usePublicationForm({ description: '' })
  const [createPost] = useGetCreatePostMutation()
  const dispatch = useAppDispatch()
  const router = useRouter()

  const onSubmit = (data: any) => {
    const combineImages: UploadType[] = images.map((items: any) => ({ uploadId: items.uploadId }))
    const dataRequest: CreatePost = {
      childrenMetadata: combineImages,
      description: data.description ?? '',
    }

    createPost(dataRequest).then(() => {
      void router.push(`/public-profile/profile/${myUserId?.userId}`)
      dispatch(imageActions.deleteState())
    })
  }

  return (
    <form
      className="mx-[15px] mt-[17px]  w-[70%] lg:w-[90%] min-w-[320px] h-auto md:bg-dark-300 md:border-dark-100  md:rounded-[2px] md:border"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <header className="flex pb-[19px] justify-between items-center custom-wrapper md:mx-[24px] md:pb-0 md:my-[12px] ">
          <Button
            className="m-[6px] px-0 min-w-0 contents"
            onClick={backStep}
            type="button"
            variant="text"
          >
            <Image alt={'back button'} height={24} src={'./arrow-without-bg.svg'} width={24} />
          </Button>
          <h2 className="text-h2"> New Publication</h2>
          <button className="text-h3 text-accent-500 m-[6px]" type="submit">
            Publish
          </button>
        </header>
        <div className="lg:flex w-full">
          <div className="max-w-[490px] md:max-w-[250px] lg:max-w-[490px] flex-shrink-0 m-auto mb-3 mb:mb-0">
            <PostImage arrImages={images} height={560} width={490} />
          </div>
          <div className="flex flex-1 flex-col justify-between w-100%">
            <div className="flex flex-col gap-6 md:m-6 md:py-6  md:pt-3">
              <UserAvatar
                avatar={me?.avatars[1].url}
                userId={me?.id}
                userName={me?.userName || ''}
              />
              <ControlledTextarea
                className="min-h-[120px] md:h-100%"
                control={control}
                error={errors.description?.message}
                fullWidth
                label="Add publication descriptions"
                name="description"
                placeholder="Text-area"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
