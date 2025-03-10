import React from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store'
import { Comment } from '@/entities/Post/Comment'
import { LikesCounter } from '@/entities/PostImage/LikesCounter'
import { PostImage } from '@/entities/PostImage/PostImage'
import { TimePublish } from '@/entities/TimePublish/TimePublish'
import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import { usePublicationForm } from '@/features/publication-form/usePublicationForm'
import { imageActions } from '@/services/create-post/postSlice'
import { CreatePost, UploadType, useGetCreatePostMutation } from '@/services/profile/postsApi'
import { useGetProfileInfoQuery } from '@/services/profile/profileApi'
import { ControlledTextarea } from '@/shared/ui'
import Button from '@/shared/ui/Button/Button'
import ExitButton from '@/shared/ui/exit-button/exit-button'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface Props {
  backStep: () => void
}

export const Publish = (props: Props) => {
  const { data: me } = useGetProfileInfoQuery()
  const { images } = useAppSelector(state => state.imageSlice)
  const { control, errors, handleSubmit } = usePublicationForm()
  const [createPost] = useGetCreatePostMutation()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const onSubmit = (data: any) => {
    const combineImages: UploadType[] = images.map((items: any) => ({ uploadId: items.uploadId }))
    const dataRequest: CreatePost = {
      childrenMetadata: combineImages,
      description: data.description,
    }

    createPost(dataRequest).then(() => {
      void router.push('/')
      dispatch(imageActions.deleteState())
    })
  }

  return (
    <form
      className="mx-[15px] mt-[17px]  w-[70%] min-w-[320px] h-auto md:bg-dark-300 md:border-dark-100  md:rounded-[2px] md:border"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <header className="flex justify-between items-center custom-wrapper md:mx-[24px] md:my-[12px] ">
          <Button
            className="m-[6px] px-0 min-w-0 contents"
            onClick={props.backStep}
            type="button"
            variant="text"
          >
            <ExitButton />
          </Button>
          <h2 className="text-h2"> New Publication</h2>
          <button className="text-h3 text-accent-500 m-[6px]" type="submit">
            Publish
          </button>
        </header>
        <div className="lg:flex w-full">
          <div className="max-w-[490px] flex-shrink-0 m-auto">
            <PostImage arrImages={images} height={560} width={490} />
          </div>
          <div className="flex flex-1 flex-col justify-between w-100%">
            <div className="flex flex-col gap-6 md:m-6 md:py-6 ">
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
