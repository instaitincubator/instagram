import React from 'react'

import { Input } from '@/shared/ui/Input/Input'
import { Image } from '@/shared/ui/icons/image'
import { MicOutline } from '@/shared/ui/icons/micOutline'

interface Props {
  className?: string
  isMobile?: boolean
}

export const MessageInput = ({ className }: Props) => (
  <div className={'p-4 flex '}>
    <Input
      className={`flex-1 border-none border-t-2 focus:outline-none ${className}`}
      fullWidth
      onChange={() => {}}
      placeholder={'Type Message'}
      type={''}
      value={''}
    />
    <div className="flex items-center">
      <MicOutline className="mr-2" />
      <Image />
    </div>
  </div>
)
