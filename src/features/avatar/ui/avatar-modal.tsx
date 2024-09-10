import React, { ChangeEvent, useState } from 'react'

import { useUploadAvatars } from '@/features/avatar/hooks/useUploadAvatars'
import { convertFileToBase64 } from '@/features/avatar/lib/convertFileToBase64'
import avatarimg from '@/shared/assets/images/defaultAvatar.jpg'
import Button from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import { StaticImageData } from 'next/image'
import Image from 'next/image'

type AvatarModalProps = {
  onClose: () => void
  onUploadSuccess: (avatar: StaticImageData | string) => void
}
const AvatarModal = ({ onClose, onUploadSuccess }: AvatarModalProps) => {
  const [ava, setAva] = useState<StaticImageData | string>(avatarimg)
  const [isUpload, setIsUpload] = useState(false)
  const [fileToUpload, setFileToUpload] = useState<File | null>(null)
  const { uploadAvatar } = useUploadAvatars()

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

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
      console.log(formData)
      uploadAvatar(formData)
        .unwrap() // Unwrap the promise to handle result/error more easily
        .then(() => {
          onUploadSuccess(ava)
          onClose()
        })
        .catch(error => {
          console.error('Upload error:', error)
        })
    } else {
      console.error('No file to upload')
    }
  }

  return (
    <Modal onClose={onClose} title={'Add a Profile Photo'} className={''}>
      {/*display: flex;*/}
      {/*flex-direction: column;*/}
      {/*gap: 60px;*/}
      {isUpload ? (
        <div>
          <div className="relative w-40 h-40 rounded-full overflow-hidden">
            {/*<Image*/}
            {/*  alt="avatar"*/}
            {/*  className="w-full h-full object-cover"*/}
            {/*  height={192}*/}
            {/*  src={ava}*/}
            {/*  width={192}*/}
            {/*/>*/}
            <img src={ava} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gray-800 bg-opacity-30 rounded-full"></div>
          </div>
          <Button onClick={saveHandler}>Save</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-14 p-32">
          <Image
            alt="avatar"
            fetchPriority={'high'}
            height={228}
            src={ava || avatarimg}
            width={222}
          />
          <label>
            <input onChange={uploadHandler} style={{ display: 'none' }} type="file" />
            <Button as="span">Select from Computer</Button>
            {/**/}
          </label>
        </div>
      )}
    </Modal>
  )
}

export default AvatarModal
