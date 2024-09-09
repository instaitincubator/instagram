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
  const [fileToUpload, setFileToUpload] = useState<File | null>(null)
  const { uploadAvatar } = useUploadAvatars()

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 10485760) {
        setFileToUpload(file)
        convertFileToBase64(file, (file64: string) => setAva(file64))
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
        .catch((error) => {
          console.error('Upload error:', error)
        })
    } else {
      console.error('No file to upload')
    }
  }

  return (
    <Modal onClose={onClose} title={'Add a Profile Photo'}>
      <div className="">
        <Image
          alt="avatar"
          fetchPriority={'high'}
          height={222}
          src={ava || avatarimg}
          width={228}
        />
        <label>
          <input onChange={uploadHandler} style={{ display: 'none' }} type="file" />
          <Button as="span">Select from Computer</Button>
          <button onClick={saveHandler}>Save</button>
        </label>
        <div className="w-48 h-48 rounded-full overflow-hidden flex items-center justify-center">
          <Image
            alt="avatar"
            className="w-full h-full object-cover"
            height={192}
            src={ava}
            width={192}
          />

        </div>
      </div>
    </Modal>
  )
}

export default AvatarModal
