import React, { ChangeEvent, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'

import { useUploadAvatars } from '@/features/avatar/hooks/useUploadAvatars'
import { convertFileToBase64 } from '@/features/avatar/lib/convertFileToBase64'
import DefaultAvatar from '@/features/avatar/ui/default-avatar'
import Button from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import Image from 'next/image'

type AvatarModalProps = {
  avatar: string
  onClose: () => void
}
const AvatarModal = ({ avatar, onClose }: AvatarModalProps) => {
  const [ava, setAva] = useState<null | string>(avatar)
  const [isUpload, setIsUpload] = useState(false)
  const [fileToUpload, setFileToUpload] = useState<File | null>(null)
  const { uploadAvatar } = useUploadAvatars()

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      const validFormats = ['image/jpeg', 'image/png']

      if (!validFormats.includes(file.type)) {
        console.error('Error: Unsupported file format! Please upload a JPEG or PNG image.')

        return
      }
      if (file.size < 10485760) {
        setFileToUpload(file)
        convertFileToBase64(file, (file64: string) => setAva(file64))
        setIsUpload(true)
      } else {
        console.error('Error: ', 'Error! Photo size must be less than 10 MB!')
      }
    }
  }
  const saveHandler = () => {
    if (fileToUpload) {
      const formData = new FormData()

      formData.append('file', fileToUpload)

      uploadAvatar(formData)
        .unwrap()
        .then(() => {
          onClose()
        })
        .catch(error => {
          console.error('Upload error:', error)
        })
    } else {
      console.error('No file to upload')
    }
  }
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  return (
    <Modal className={'px-0'} onClose={onClose} title={'Add a Profile Photo'}>
      {isUpload ? (
        <div className={'mt-3 mb-5'}>
          <AvatarEditor
            borderRadius={999}
            className={'mb-9 mx-0 md:mx-1 min-w-[300px] min-h-[300px]  w-full'}
            disableBoundaryChecks
            image={fileToUpload}
            onMouseDown={handleMouseMove}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseMove}
          />
          <Button className={'ml-auto'} onClick={saveHandler}>
            Save
          </Button>
        </div>
      ) : (
        <div className={''}>
          {ava ? (
            <Image
              alt="avatar"
              className={'mb-9'}
              fetchPriority={'high'}
              height={300}
              src={ava}
              width={300}
            />
          ) : (
            <DefaultAvatar className={'mb-9'} />
          )}

          <label>
            <input
              accept={'image/*'}
              onChange={uploadHandler}
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
