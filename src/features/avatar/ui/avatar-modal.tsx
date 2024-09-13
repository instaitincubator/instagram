import React, { ChangeEvent, useState } from 'react'

import { useUploadAvatars } from '@/features/avatar/hooks/useUploadAvatars'
import { convertFileToBase64 } from '@/features/avatar/lib/convertFileToBase64'
import avatarimg from '@/shared/assets/images/defaultAvatar.jpg'
import Button from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import { StaticImageData } from 'next/image'
import Image from 'next/image'

type AvatarModalProps = {
  avatar: string
  onClose: () => void
}
const AvatarModal = ({ avatar, onClose }: AvatarModalProps) => {
  const [ava, setAva] = useState<StaticImageData | string>(avatar)
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
    <Modal className={''} onClose={onClose} title={'Add a Profile Photo'}>
      {/*display: flex;*/}
      {/*flex-direction: column;*/}
      {/*gap: 60px;*/}
      {isUpload ? (
        <div className={'overflow-hidden'}>
          <div className="relative w-80 h-80 mx-20 mt-3">
            {/* Фото (1 слой) */}
            <Image
              alt="avatar"
              className="w-full h-full object-cover"
              height={300}
              src={ava}
              width={300}
            />

            {/* Полупрозрачный черный слой с прозрачным центром (2 слой) */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Прозрачный круглый слой (3 слой) */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                borderRadius: '50%', // Делаем круг
                boxShadow: '0 0 0 1000px rgba(0, 0, 0, 0.5)', // Создаем тень вокруг круга
              }}
            ></div>
          </div>

          <Button className="relative z-10 mt-4" onClick={saveHandler}>
            Save
          </Button>
        </div>
      ) : (
        <div className="">
          <div className={'flex flex-col gap-14 pt-14 px-32 pb-24'}>
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
            </label>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default AvatarModal
