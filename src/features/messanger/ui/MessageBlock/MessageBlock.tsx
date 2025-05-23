import React, { useEffect, useState } from 'react'

import { useGetUserMessageQuery } from '@/features/messanger/Messanger-API'
import { ChatMessage } from '@/features/messanger/MessangerAPItypes'
import { MessageHeader } from '@/features/messanger/ui/MessageBlock/MessageHeader/MessageHeader'
import { getToken } from '@/shared/utils/storage'
import Image from 'next/image'
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
      setMessages(prevState => [messages, ...prevState])
    })
    socket.on('message-sent', message => {
      setMessages(prevState => [message, ...prevState])

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
      setMessages(prevState => [messages, ...prevState])
    })
    socket.on('message-sent', message => {
      setMessages(prevState => [message, ...prevState])

      socket.emit('acknowledge', { message, receiverId: id })
    })
    setText('')
  }

  return (
    <div className="flex flex-col rounded-lg w-full h-full overflow-hidden">
      {/* Desktop version */}
      <div className={'hidden md:flex md:flex-col h-full w-full'}>
        <MessageHeader userAvatar={userAvatar} userName={userName} />
        <div className="flex-1 relative">
          {userName ? (
            <div className="absolute inset-0 p-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex flex-col-reverse space-y-reverse space-y-4">
                {messages.map(el => {
                  const date = new Date(el.createdAt)
                  const hours = date.getHours().toString().padStart(2, '0')
                  const minutes = date.getMinutes().toString().padStart(2, '0')
                  const timeString = `${hours}:${minutes}`

                  return el.ownerId === id ? (
                    <div className={'flex justify-start pl-[6px] w-full'} key={el.id}>
                      <Image
                        alt={'avatar'}
                        className={'rounded-full w-[36px] h-[36px] mt-auto mr-[6px] flex-shrink-0'}
                        height={48}
                        src={userAvatar ? userAvatar : '/avatar.png'}
                        width={48}
                      />
                      <div
                        className={
                          'flex flex-col items-start justify-start bg-dark-300 rounded-[8px] p-[6px] max-w-[70%]'
                        }
                      >
                        <div className="break-words">{el.messageText}</div>
                        <div className="text-sm text-gray-400 pt-[6px]">{timeString}</div>
                      </div>
                    </div>
                  ) : (
                    <div className={'flex justify-end w-full'} key={el.id}>
                      <div
                        className={
                          'flex flex-col items-end justify-end bg-accent-700 rounded-[8px] p-[6px] max-w-[70%]'
                        }
                      >
                        <div className="break-words">{el.messageText}</div>
                        <div className="text-sm text-gray-400 pt-[6px]">{timeString}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-dark-300 px-6 py-3 rounded-[8px] text-center">
                Choose who you would like to talk to
              </div>
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
