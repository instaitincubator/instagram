import { useState } from 'react'

import { useGetUserMessageQuery } from '@/features/messanger/Messanger-API'
import { getToken } from '@/shared/utils/storage'
import { io } from 'socket.io-client'

import { ChooseChatPanel } from './ui/ChooseChatPanel/ChooseChatPanel'

export const Messanger = () => {
  const [userId, setUserId] = useState<null | number>(null)
  const { data } = useGetUserMessageQuery({ id: 2979 })

  console.log(data)
  const clik = () => {
    const socket = io('https://inctagram.work', {
      query: {
        accessToken: getToken(),
      },
    })

    socket.emit('receive-message', { message: 'test', receiverId: 2979 })
  }

  return (
    <div className="h-full flex">
      <div className="flex-1">
        <ChooseChatPanel />
      </div>
      {/*{data.map((el, index) => (*/}
      {/*  <div key={index}>{el}</div>*/}
      {/*))}*/}
      <div>
        <button onClick={clik}>x</button>
        {data ? (
          data.items.map((el, index) => (
            <div key={index}>
              {el.id}-{el.messageText}
            </div>
          ))
        ) : (
          <div> Nothing</div>
        )}
      </div>
    </div>
  )
}
