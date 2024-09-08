import { ChangeEvent, useState } from 'react'

import avatarimg from '@/shared/assets/images/defaultAvatar.jpg'
import Button from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import { IconButton } from '@storybook/components'
import Image, { StaticImageData } from 'next/image'
import { useUploadProfileAvatarMutation } from '@/services/profile/profileApi'
import { log } from 'node:util'

export const Avatar = () => {
  const [uploadAvatar, { isLoading, isSuccess, error }] = useUploadProfileAvatarMutation()

  const [ava, setAva] = useState<StaticImageData | string>(avatarimg)
  const [open, isOpen] = useState(false)
  const [fileToUpload, setFileToUpload] = useState<File | null>(null)
  const saveHandler = () => {
    if (fileToUpload) {
      const formData = new FormData();
      formData.append('file', fileToUpload);

      // Выполняем загрузку аватара
      uploadAvatar(formData).then((response) => {
        console.log('Upload success:', response);
      }).catch((uploadError) => {
        console.error('Upload error:', uploadError);
      });
    } else {
      console.error('No file to upload');
    }
  };
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      console.log(file)
      if (file.size < 10485760) {

        convertFileToBase64(file, (file64: string) => {
          const formData = new FormData() // Use FormData for file uploads
          console.log('file ' + file)
          setFileToUpload(formData)
          formData.append('file', formData)
          uploadAvatar(formData)
          console.log('formData in uploadHandler ' + formData)

          return setAva(file64)
        })
      } else {
        console.error('Error: ', 'Error! Photo size must be less than 10 MB!')
      }
    }
  }
  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      const file64 = reader.result as string

      callBack(file64)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <Image
        alt="avatar"
        className={'rounded-full'}
        fetchPriority={'high'}
        height={192}
        src={ava || avatarimg}
        width={192}
      />
      <Button onClick={() => isOpen(true)} variant={'outline'}>
        Add a Profile Photo
      </Button>
      <Modal title={'Add a Profile Photo'}>
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
        </div>
      </Modal>
    </div>
  )
}
