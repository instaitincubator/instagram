import React, { ChangeEvent, useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'

import DefaultAvatar from '@/features/avatar/ui/default-avatar'
import CropperImage from '@/features/cropper-image/cropper-image'
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

  const onImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const validFormats = ['image/jpeg', 'image/png']

      if (!validFormats.includes(e.target.files[0].type)) {
        console.error('Error: Unsupported file format! Please upload a JPEG or PNG image.')

        return
      }
      if (e.target.files[0].size < 10485760) {
        setSrc(URL.createObjectURL(e.target.files[0]))
        setIsUpload(true)
      } else {
        console.error('Error: ', 'Error! Photo size must be less than 10 MB!')
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
        <div className={'mt-3 mb-5'}>
          <CropperImage image={src || ''} ref={cropRef} />
          <Button className={'ml-auto'} onClick={handleSave}>
            Save
          </Button>
        </div>
      ) : (
        <div className={''}>
          {avatar ? (
            <Image
              alt="avatar"
              className={'mb-9'}
              fetchPriority={'high'}
              height={300}
              src={avatar}
              width={300}
            />
          ) : (
            <DefaultAvatar className={'mb-9'} />
          )}

          <label>
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
