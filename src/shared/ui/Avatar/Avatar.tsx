import React, { ChangeEvent, useRef, useState } from 'react'
import Cropper from 'react-easy-crop'

import Button from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import { validateImageUpload } from '@/shared/utils/ImageValidation'
import Image from 'next/image'

import { useTranslation } from '../../../../hooks/useTranslation'

export const Avatar = () => {
  const [openModal, setOpenModal] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [imageFile, setImageFile] = useState<File | null | string>(null)
  const [err, setErr] = useState<string | undefined>('')
  const { t } = useTranslation()
  const onclickHandler = () => {
    setOpenModal(true)
  }

  const uploadButtonClickHandler = () => {
    inputRef?.current?.click()
  }
  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const isValid = validateImageUpload(e)
    const err = isValid.error

    if (err?.includes('format')) {
      setErr(t.pages.profile.settings.formatImage)
    } else if (err?.includes('size')) {
      setErr(t.pages.profile.settings.maxFileSize)
    }
    if (e.target.files && isValid.isValid) {
      const file = e.target.files[0]
      const imageSrc = await readFile(file)

      if (isValid) {
        setImageFile(imageSrc)
      }
    }
  }

  function readFile(file: File): Promise<string> {
    return new Promise(resolve => {
      const reader = new FileReader()

      reader.addEventListener('load', () => resolve(reader.result as string), false)
      reader.readAsDataURL(file)
    })
  }
  const cropperClasses = {
    containerClassName: '',
    cropAreaClassName: 'w-[332px] h-[340px]',
    mediaClassName: 'w-[332px] h-[340px]',
  }

  return (
    <>
      <div className="flex flex-col items-center gap-[24px]">
        <div className="relative w-[192px] h-[192px] rounded-full bg-dark-500">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image alt="картинка" height={48} src="/avatar.svg" width={48} />
          </div>
        </div>

        <Button onClick={onclickHandler} variant="outline">
          Add a Profile Photo
        </Button>
      </div>
      {openModal && (
        <Modal onClose={() => setOpenModal(false)} title="Add a Profile Photo">
          {imageFile ? (
            <div className="min-h-[500px] min-w-[468px]">
              <Cropper
                aspect={1}
                classes={cropperClasses}
                crop={{ x: 0, y: 0 }}
                cropShape={'round'}
                image={imageFile as string}
                onCropChange={() => {}}
                // onCropComplete={onCropComplete}
                // onZoomChange={setZoom}
                // zoom={zoom}
              />
            </div>
          ) : (
            <>
              {err && (
                <div className="absolute max-w-[445px] border border-red-500 bg-red-900 px-6">
                  <span className="px-6 text-wrap flex justify-center text-center text-bold-14">
                    {err}
                  </span>
                </div>
              )}
              <div className="flex flex-col px-[111px] pt-[80px] items-center w-[468px] m-auto">
                <div className="flex relative  w-[222px] h-[228px] ">
                  <div className="absolute inset-0 flex items-center justify-center bg-dark-900">
                    <Image alt="картинка" height={48} src="/avatar.svg" width={48} />
                  </div>
                </div>
                <div className="pt-[60px] pb-[96px]">
                  <Button className="w-[222px]" onClick={uploadButtonClickHandler} type="button">
                    Select from Computer
                  </Button>
                  <input className="hidden" onChange={uploadImage} ref={inputRef} type="file" />
                </div>
              </div>
            </>
          )}
        </Modal>
      )}
    </>
  )
}
