import React from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store'
import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import { usePublicationForm } from '@/features/publication-form/usePublicationForm'
import { CreatePost, UploadType, useGetCreatePostMutation } from '@/services/profile/postsApi'
import { useGetProfileInfoQuery } from '@/services/profile/profileApi'
import { ControlledTextarea } from '@/shared/ui'
import ExitButton from '@/shared/ui/exit-button/exit-button'

const Publish = () => {
  const { data: me } = useGetProfileInfoQuery()
  const { images } = useAppSelector(state => state.imageSlice)
  const { control, errors, handleSubmit } = usePublicationForm()
  const [createPost] = useGetCreatePostMutation()
  const dispatch = useAppDispatch()

  const onSubmit = async (data: any) => {
    const combineImages: UploadType[] = images.map((items: any) => ({ uploadId: items.uploadId }))
    const dataRequest: CreatePost = {
      childrenMetadata: combineImages,
      description: data.description,
    }

    try {
      const res = await createPost(dataRequest).unwrap()

      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }
  const onSubmit2 = async (data: any) => {
    const combineImages: UploadType[] = images.map((items: any) => ({ uploadId: items.uploadId }))
    const dataRequest: CreatePost = {
      childrenMetadata: combineImages,
      description: data.description,
    }

    try {
      const result = await createPost(dataRequest).unwrap()

      console.log(result)
    } catch (err) {
      console.log('Failed to create post:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={'mx-[15px] mt-[17px]'}>
        <div className="flex justify-between items-center custom-wrapper">
          <div className={'m-[6px]'}>
            <ExitButton />
          </div>
          <h2 className={'text-h2'}> New Publication</h2>
          <button className={'text-h3 text-accent-500 m-[6px]'} type={'submit'}>Publish</button>
        </div>
        <div className="flex gap-[6px] mt-[19px] mb-[12px]">
          {images.map(el => (
            <img
              alt={`img-${el.uploadId}`}
              className={'h-[96px] w-[96]'}
              key={el.uploadId}
              src={el.url}
            />
          ))}
        </div>
        <UserAvatar avatar={me?.avatars[1].url} userId={me?.id} userName={me?.userName || ''} />
      </div>
      <div className="">
        <ControlledTextarea
          control={control}
          error={errors.description?.message}
          name={'description'}
          placeholder={'Text-area'}
        />
        {/*<button type={'submit'}>x</button>*/}
      </div>
    </form>
  )
}

export default Publish
