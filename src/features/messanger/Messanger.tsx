import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { ChatMessage } from '@/features/messanger/MessangerAPItypes'
import { MessageBlock } from '@/features/messanger/ui/MessageBlock/MessageBlock'
import { useMeQuery } from '@/services/auth/signInApi'

import { ChooseChatPanel } from './ui/ChooseChatPanel/ChooseChatPanel'

export const Messenger = () => {
  const [selectedChat, setSelectedChat] = useState(null)
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  const [userId, setUserId] = useState<null | number>(null)
  const { data: me } = useMeQuery()
  const [userDetails, setUserDetails] = useState({ name: '', userAvatar: '' })

  const handleSelectChat = (e: ChatMessage) => {
    if (e.receiverId === me?.userId) {
      setUserId(e.ownerId)
    } else {
      setUserId(e.receiverId)
    }
    setUserDetails({ name: e.userName, userAvatar: e.avatars[0]?.url })
  }

  const showChooseChatPanel = selectedChat === null || !isMobile
  const showMessageBlock = isMobile ? selectedChat !== null : true

  return (
    <div className="h-full flex flex-col sm:flex-row">
      <div className={`${isMobile ? 'flex-1' : 'flex'} ${showChooseChatPanel ? 'flex' : 'hidden'}`}>
        <ChooseChatPanel handleSelectChat={handleSelectChat} />
      </div>

      <div className={`flex-1 ${showMessageBlock ? 'flex' : 'hidden'}`}>
        <MessageBlock id={userId} userAvatar={userDetails.userAvatar} userName={userDetails.name} />
      </div>
    </div>
  )
}
