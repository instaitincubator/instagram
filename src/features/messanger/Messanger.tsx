import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { ChatMessage } from '@/features/messanger/MessangerAPItypes'
import { MessageBlock } from '@/features/messanger/ui/MessageBlock/MessageBlock'
import { useMeQuery } from '@/services/auth/signInApi'
import { useRouter } from 'next/router'

import { ChooseChatPanel } from './ui/ChooseChatPanel/ChooseChatPanel'

export const Messenger = () => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [userId, setUserId] = useState<null | number>(null)
  const [userDetails, setUserDetails] = useState({ name: '', userAvatar: '' })

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const { data: me } = useMeQuery()
  const router = useRouter()
  const { chatId, name, src } = router.query

  useEffect(() => {
    if (typeof chatId === 'string') {
      setUserId(Number(chatId))
    } else if (Array.isArray(chatId) && chatId.length > 0) {
      setUserId(Number(chatId[0]))
    } else {
      setUserId(null)
    }

    if (typeof name === 'string') {
      setUserDetails(prev => ({ ...prev, name }))
    }
    if (typeof src === 'string') {
      setUserDetails(prev => ({ ...prev, userAvatar: src }))
    }
  }, [chatId, name, src])

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
