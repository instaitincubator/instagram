import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import AvatarEditor from 'react-avatar-editor'

import { clsx } from 'clsx'

type Props = {
  className?: string
  image: string
} & Omit<ComponentPropsWithoutRef<typeof AvatarEditor>, 'className'>
const CropperImage = forwardRef<ElementRef<typeof AvatarEditor>, Props>(
  ({ className, image, ...rest }, ref) => {
    return (
      <AvatarEditor
        ref={ref}
        {...rest}
        borderRadius={999}
        className={clsx(className, 'mb-9 mx-0 md:mx-1 min-w-[300px] min-h-[300px]  w-full')}
        image={image}
      />
    )
  }
)

export default CropperImage
