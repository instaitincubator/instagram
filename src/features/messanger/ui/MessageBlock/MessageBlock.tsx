import React from 'react'

import { MessageHeader } from './MessageHeader/MessageHeader'
import { MessageInput } from './MessageInput/MessageInput'

export const MessageBlock = () => {
  return (
    <div className="flex flex-col rounded-lg w-full h-full">
      {/* Desktop version */}
      <div className={'hidden md:flex flex-col flex-1'}>
        <MessageHeader />
        <div className="flex-1 p-4 overflow-y-auto">{/* Здесь будут сообщения */}</div>
        <div className="border-t-2 border-light-900">
          <MessageInput className={'focus:bg-dark-700  hover:bg-dark-700'} />
        </div>
      </div>

      {/* Mobile version */}
      <div className={'md:hidden flex flex-col h-full'}>
        <MessageHeader isMobile />
        <div className="flex-1 p-4 overflow-y-auto">{/* Здесь будут сообщения */}</div>
        <div className="mt-[550px] bg-dark-300">
          <MessageInput className={'focus:bg-dark-300 hover:bg-dark-300 '} />
        </div>
      </div>
    </div>
  )
}
