import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import { FormatDateForPost } from '@/features/home/ui/formatDateForPost'
import { useGetLatestMessagesQuery } from '@/features/messanger/Messanger-API'
import { ChatMessage } from '@/features/messanger/MessangerAPItypes'
import { useTranslation } from '@/shared/hooks/useTranslation'
import SearchWithQueries from '@/shared/ui/Input/SearchWithQueries'
import { cn } from '@/shared/utils/cn'
import { useRouter } from 'next/router'

import { LoadingDots } from '../LoadingDots/LoadingDots'

interface Props {
  handleSelectChat: (el: ChatMessage) => void
}

export const ChooseChatPanel = ({ handleSelectChat }: Props) => {
  const [page, setPage] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()
  const router = useRouter()

  const searchTerm = (router.query.searchTerm as string) || ''

  const { data, isFetching, isLoading } = useGetLatestMessagesQuery({
    cursor: page,
    pageSize: 10,
    searchName: searchTerm,
  })

  const sortedMessages = useMemo(() => {
    if (!data?.items) {
      return []
    }

    const unreadMessages = data.items.filter(msg => msg.status === 'SENT')
    const readMessages = data.items.filter(msg => msg.status === 'READ')

    const sortByDate = (a: ChatMessage, b: ChatMessage) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()

    unreadMessages.sort(sortByDate)
    readMessages.sort(sortByDate)

    return [...unreadMessages, ...readMessages]
  }, [data?.items])

  const hasMore = data ? (page + 1) * 10 < data.totalCount : false

  const next = useCallback(() => {
    if (!isFetching && containerRef.current) {
      const { clientHeight, scrollHeight, scrollTop } = containerRef.current

      if (scrollHeight - scrollTop <= clientHeight + 100) {
        setPage(prev => prev + 1)
      }
    }
  }, [isFetching])

  useEffect(() => {
    setPage(0)
  }, [searchTerm])

  if (isLoading || !data) {
    return <LoadingDots />
  }

  const selectChat = (el: ChatMessage) => {
    handleSelectChat(el)
    router.push(`/message/${el.receiverId}`)
  }

  return (
    <div className="h-full flex flex-col w-full sm:border-r sm:border-dark-300 sm:bg-dark-500">
      <div className="p-4 h-[72px] flex-shrink-0">
        <SearchWithQueries placeholder={t.messanger.searchPlaceholder} />
      </div>
      <div className="flex-1 relative">
        <div className="absolute inset-0 overflow-y-auto overflow-x-hidden">
          <InfiniteScroll
            dataLength={sortedMessages.length}
            endMessage={
              <p className="text-center p-2.5">
                {!sortedMessages ? <b>{t.messanger.noMoreMessages}</b> : ''}
              </p>
            }
            hasMore={hasMore}
            loader={isFetching ? <LoadingDots /> : null}
            next={next}
            scrollableTarget="scrollableDiv"
          >
            <div className="overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" id="scrollableDiv" ref={containerRef}>
              {sortedMessages.map((latestMessage, index) => (
                <div
                  className={cn(
                    'p-2 border-b hover:bg-dark-500 border-dark-300 flex gap-4 cursor-pointer',
                    index === 0 && 'border-t'
                  )}
                  key={latestMessage.id}
                  onClick={() => selectChat(latestMessage)}
                >
                  <div className="flex-shrink-0">
                    <UserAvatar
                      avatar={latestMessage.avatars[0]?.url}
                      avatarSize={40}
                      isShowedText={false}
                      userId={latestMessage.ownerId}
                      userName=""
                    />
                  </div>
                  <div className="flex-grow flex flex-col justify-between py-2 min-w-0">
                    <div className="font-medium truncate">{latestMessage.userName}</div>
                    <div className="text-gray-600 truncate">{latestMessage.messageText}</div>
                  </div>
                  <div className="flex-shrink-0 text-xs text-gray-500">
                    <FormatDateForPost createdAt={latestMessage.createdAt} />
                  </div>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  )
}
