import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'

import { useAppDispatch, useAppSelector } from '@/app/store'
import DefaultAvatar from '@/features/avatar/ui/default-avatar'
import ErrorAlert from '@/features/avatar/ui/error-alert'
import CropperImage from '@/features/cropper-image/cropper-image'
import { errorActions } from '@/services/notification/error-notification'
import { useUploadAvatars } from '@/shared/hooks/useUploadAvatars'
import Button from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import Image from 'next/image'

type AvatarModalProps = {
  avatar: string
  onClose: () => void
}
const AvatarModal = ({ avatar, onClose }: AvatarModalProps) => {
  const [isUpload, setIsUpload] = useState(false)
  const { uploadAvatar } = useUploadAvatars()
  const [src, setSrc] = useState<null | string>(null)
  const cropRef = useRef<AvatarEditor>(null)

  const error = useAppSelector(state => state.errorNotions.error)
  const dispatch = useAppDispatch()

  const isError = () => {
    dispatch(errorActions.setError(false))
  }

  useEffect(() => {
    if (error) {
      setTimeout(isError, 5000)
    }
  }, [error])

  const onImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const validFormats = ['image/jpeg', 'image/png']

      if (!validFormats.includes(e.target.files[0].type)) {
        dispatch(errorActions.setMessage('The format of the uploaded photo must be PNG and JPEG'))
        dispatch(errorActions.setError(true))

        return
      }
      if (e.target.files[0].size < 10485760) {
        setSrc(URL.createObjectURL(e.target.files[0]))
        setIsUpload(true)
      } else {
        dispatch(errorActions.setError(true))
        dispatch(errorActions.setMessage('Photo size must be less than 10 MB!'))
      }
    }
  }

  const handleSave = async () => {
    if (cropRef.current) {
      const dataUrl = cropRef.current.getImage().toDataURL()
      const response = await fetch(dataUrl)
      const blob = await response.blob()

      const file = new File([blob], 'avatar.png', { type: blob.type }) // Create a File

      const formData = new FormData()

      formData.append('file', file) // Append the file to FormData

      try {
        await uploadAvatar(formData).unwrap()
        onClose()
      } catch (error) {
        console.error('Upload error:', error)
      }
    } else {
      console.error('No crop reference found')
    }
  }

  return (
    <Modal className={'px-0'} onClose={onClose} title={'Add a Profile Photo'}>
      {isUpload ? (
        <div className="mt-3">
          <div className={' mx-[76px] '}>
            <CropperImage className={'m-full'} image={src || ''} ref={cropRef} />
          </div>
          <Button className={'mb-5 ml-auto'} onClick={handleSave}>
            Save
          </Button>
        </div>
      ) : (
        <div
          className={`flex flex-col  items-center md:mt-[68px]  md:mb-[104px] ${error ? 'md:mt-[24px] md:px-[54px] md:mb-[92px]' : ' md:mx-[129px] '}`}
        >
          {error && <ErrorAlert />}
          {avatar ? (
            <Image
              alt="avatar"
              className={'mb-9 md:mb-[60px]'}
              fetchPriority={'high'}
              height={300}
              src={avatar}
              width={300}
            />
          ) : (
            <DefaultAvatar className={'mb-9'} />
          )}

          <label className={'w-full md:w-[300px]'}>
            <input
              accept={'image/*'}
              onChange={onImageUpload}
              style={{ display: 'none' }}
              type="file"
            />
            <Button as="span">Select from Computer</Button>
          </label>
        </div>
      )}
    </Modal>
  )
}

export default AvatarModal
