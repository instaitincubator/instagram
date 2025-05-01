import { useEffect, useState } from 'react'

import { useGetUserMessageQuery } from '@/features/messanger/Messanger-API'
import { useMeQuery } from '@/services/auth/signInApi'
import { Input } from '@/shared/ui/Input/Input'
import { getToken } from '@/shared/utils/storage'
import { io } from 'socket.io-client'

import { ChooseChatPanel } from './ui/ChooseChatPanel/ChooseChatPanel'

export const Messanger = () => {
  const [userId, setUserId] = useState<null | number>(null)
  const { data: me } = useMeQuery()

  const loadId = (e: any) => {
    if (e.receiverId === me?.userId) {
      setUserId(e.ownerId)
    } else {
      setUserId(e.receiverId)
    }
  }

  return (
    <div className="h-full flex">
      <div className="flex-1">
        <ChooseChatPanel sentId={loadId} />
      </div>
      {userId && <MessageList id={userId} />}
    </div>
  )
}

const MessageList = ({ id }: { id: number }) => {
  const { data } = useGetUserMessageQuery({ id })
  const [text, setText] = useState('')
  const [messages, setMessages] = useState([])

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

      // Подтверждаем получение сообщения
      socket.emit('acknowledge', { message, receiverId: id })
    })

    return () => {
      socket.disconnect()
    }
  }, [id])
  const clik = () => {
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

      // Подтверждаем получение сообщения
      socket.emit('acknowledge', { message, receiverId: id })
    })
    setText('')
  }

  return (
    <div>
      {messages.map((el: any) => (
        <div key={el.id}>{el.messageText}</div>
      ))}
      <Input onChange={event => setText(event.target.value)} value={text} />
      <button onClick={clik} type={'button'}>
        x
      </button>
    </div>
  )
}
