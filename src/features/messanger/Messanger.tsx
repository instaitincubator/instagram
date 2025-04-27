import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { MessageBlock } from '@/features/messanger/ui/MessageBlock/MessageBlock'

import { ChooseChatPanel } from './ui/ChooseChatPanel/ChooseChatPanel'

export const Messenger = () => {
  const [selectedChat, setSelectedChat] = useState(null)

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  return (
    <div className="h-full flex flex-col sm:flex-row">
      {isMobile ? (
        <>{selectedChat ? <MessageBlock /> : <ChooseChatPanel />}</>
      ) : (
        <>
          <div className="hidden sm:flex sm:max-w-[300px]">
            <ChooseChatPanel />
          </div>
          <div className="hidden flex-1 sm:flex">
            <MessageBlock />
          </div>
        </>
      )}
    </div>
  )
}
