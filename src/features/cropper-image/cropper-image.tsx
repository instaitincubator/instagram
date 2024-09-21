import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import AvatarEditor from 'react-avatar-editor'

type Props = {
  image: string
  // setFormData: (formData: FormData) => void
} & ComponentPropsWithoutRef<typeof AvatarEditor>
const CropperImage = forwardRef<ElementRef<typeof AvatarEditor>, Props>(
  ({ image, ...rest }, ref) => {
    return (
      <AvatarEditor
        ref={ref}
        {...rest}
        borderRadius={999}
        className={'mb-9 mx-0 md:mx-1 min-w-[300px] min-h-[300px]  w-full'}
        disableBoundaryChecks
        image={image}
      />
    )
  }
)

export default CropperImage
