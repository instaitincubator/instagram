import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { MessageBlock } from '@/features/messanger/ui/MessageBlock/MessageBlock'

import { ChooseChatPanel } from './ui/ChooseChatPanel/ChooseChatPanel'

export const Messenger = () => {
  const [selectedChat, setSelectedChat] = useState(null)
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  const showChooseChatPanel = selectedChat === null || !isMobile
  const showMessageBlock = isMobile ? selectedChat !== null : true

  return (
    <div className="h-full flex flex-col sm:flex-row">
      <div className={`${isMobile ? 'flex-1' : 'flex'} ${showChooseChatPanel ? 'flex' : 'hidden'}`}>
        <ChooseChatPanel />
      </div>

      <div className={`flex-1 ${showMessageBlock ? 'flex' : 'hidden'}`}>
        <MessageBlock />
      </div>
    </div>
  )
}
