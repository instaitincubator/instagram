import { useEffect, useState } from 'react'

import { useGetUserMessageQuery } from '@/features/messanger/Messanger-API'
import { Input } from '@/shared/ui/Input/Input'
import { getToken } from '@/shared/utils/storage'
import { io } from 'socket.io-client'

import { ChooseChatPanel } from './ui/ChooseChatPanel/ChooseChatPanel'

export const Messanger = () => {
  const [userId, setUserId] = useState<null | number>(null)
  const { data } = useGetUserMessageQuery({ id: 2979 })

  const loadId = (e: any) => {
    console.log(e)
    setUserId(e.receiverId)
    // data({ id: e.ownerId })
  }

  useEffect(() => {
    const socket = io('https://inctagram.work', {
      query: {
        accessToken: getToken(),
      },
    })

    socket.on('receive-message', messages => {
      console.log(messages)
    })

    if (data) {
      console.log(data.items)
    }
  }, [data])

  return (
    <div className="h-full flex">
      <div className="flex-1">
        <ChooseChatPanel sentId={loadId} />
      </div>
      {/*{data.map((el, index) => (*/}
      {/*  <div key={index}>{el}</div>*/}
      {/*))}*/}
      {/*<button onClick={clik}>x</button>*/}
      {userId && <MessageList id={userId} />}
      <div>
        {/*{data ? (*/}
        {/*  data.items.map((el, index) => (*/}
        {/*    <div key={index}>*/}
        {/*      {el.id}-{el.messageText}*/}
        {/*    </div>*/}
        {/*  ))*/}
        {/*) : (*/}
        {/*  <div> Nothing</div>*/}
        {/*)}*/}
      </div>
    </div>
  )
}

const MessageList = ({ id }: { id: number }) => {
  const { data } = useGetUserMessageQuery({ id })
  const [text, setText] = useState('')

  useEffect(() => {
    const socket = io('https://inctagram.work', {
      query: {
        accessToken: getToken(),
      },
    })

    socket.on('receive-message', messages => {
      console.log(messages)
    })

    if (data) {
      console.log(data.items)
    }
  }, [])
  const clik = () => {
    const socket = io('https://inctagram.work', {
      query: {
        accessToken: getToken(),
      },
    })

    socket.emit('receive-message', { message: text, receiverId: id })
  }

  return (
    <div>
      {data?.items.map(el => <div key={el.id}>{el.messageText}</div>)}
      <Input onChange={event => setText(event.target.value)} value={text} />
      <button onClick={clik}>x</button>
    </div>
  )
}
