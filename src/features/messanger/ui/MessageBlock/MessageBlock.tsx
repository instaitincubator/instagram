import React, { useEffect, useState } from 'react'

import { useGetUserMessageQuery } from '@/features/messanger/Messanger-API'
import { ChatMessage } from '@/features/messanger/MessangerAPItypes'
import { MessageHeader } from '@/features/messanger/ui/MessageBlock/MessageHeader/MessageHeader'
import { getToken } from '@/shared/utils/storage'
import { io } from 'socket.io-client'

import { MessageInput } from './MessageInput/MessageInput'

interface Props {
  id: null | number
  userAvatar: string
  userName: string
}

export const MessageBlock = ({ id, userAvatar, userName }: Props) => {
  const { data } = useGetUserMessageQuery({ id })
  const [text, setText] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])

  useEffect(() => {
    if (data) {
      setMessages(data.items)
    }
  }, [data])
  useEffect(() => {
    const socket = io('https://inctagram.work', {
      query: {
        accessToken: getToken(),
      },
    })

    socket.on('receive-message', messages => {
      setMessages(prevState => prevState.concat(messages))
    })
    socket.on('message-sent', message => {
      setMessages(prevState => prevState.concat(message))

      socket.emit('acknowledge', { message, receiverId: id })
    })

    return () => {
      socket.disconnect()
    }
  }, [id])
  const handlerSendMessage = () => {
    const socket = io('https://inctagram.work', {
      query: {
        accessToken: getToken(),
      },
    })

    socket.emit('receive-message', { message: text, receiverId: id })
    socket.on('receive-message', messages => {
      setMessages(prevState => prevState.concat(messages))
    })
    socket.on('message-sent', message => {
      setMessages(prevState => prevState.concat(message))

      socket.emit('acknowledge', { message, receiverId: id })
    })
    setText('')
  }

  return (
    <div className="flex flex-col rounded-lg w-full h-full">
      {/* Desktop version */}
      <div className={'hidden md:flex flex-col flex-1 '}>
        <MessageHeader userAvatar={userAvatar} userName={userName} />
        <div className="flex-1 p-4 overflow-y-auto">
          {messages && messages.length > 0 ? (
            messages.map(el => <div key={el.id}>{el.messageText}</div>)
          ) : (
            <div
              className={
                'bg-dark-300 w-[293px] h-[48px] rounded-[8px] flex items-center justify-center absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2'
              }
            >
              Choose who you would like to talk to
            </div>
          )}
        </div>
        <div className="border-t-2 border-light-900">
          <MessageInput
            className={'focus:bg-dark-700  hover:bg-dark-700'}
            handlerSendMessage={handlerSendMessage}
            setText={setText}
            text={text}
          />
        </div>
      </div>

      {/*Mobile version */}
      <div className={'md:hidden flex flex-col h-screen '}>
        <MessageHeader isMobile userAvatar={userAvatar} userName={userName} />
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map(el => (
            <div key={el.id}>{el.messageText}</div>
          ))}
        </div>
        <div className="bg-dark-300 fixed bottom-[60px] w-full ">
          <MessageInput
            className={'focus:bg-dark-300 hover:bg-dark-300 '}
            handlerSendMessage={handlerSendMessage}
            setText={setText}
            text={text}
          />
        </div>
      </div>
    </div>
  )
}
