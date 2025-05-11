import React from 'react'

import { Input } from '@/shared/ui/Input/Input'
import { Image } from '@/shared/ui/icons/image'
import { MicOutline } from '@/shared/ui/icons/micOutline'

interface Props {
  className?: string
  handlerSendMessage: () => void
  isMobile?: boolean
  setText: any
  text: string
}

export const MessageInput = ({ className, handlerSendMessage, setText, text }: Props) => (
  <div className={'p-4 flex '}>
    <Input
      className={`flex-1 border-none border-t-2 focus:outline-none ${className}`}
      fullWidth
      onChange={event => setText(event.target.value)}
      placeholder={'Type Message'}
      type={''}
      value={text}
    />
    {text ? (
      <div className={'text-nowrap text-accent-500'}>
        <button onClick={handlerSendMessage}>Send message</button>
      </div>
    ) : (
      <div className="flex items-center">
        <MicOutline className="mr-2" />
        <Image />
      </div>
    )}
  </div>
)
