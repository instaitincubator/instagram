import { useEffect, useRef, useState } from 'react'

import { getPublicLayoutWithSidebar } from '@/app/layouts/PublicLayoutWithSidebar/PublicLayoutWithSidebar'
import { useLazyGetAllUsersQuery } from '@/services/users/users-api'
import { Items } from '@/services/users/usersApiTypes'
import SearchWithQueries from '@/shared/ui/Input/SearchWithQueries'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Search = () => {
  const observerRef = useRef<HTMLDivElement | null>(null)
  const [users, setUsers] = useState<Items[]>([])
  const router = useRouter()
  const [cursor, setCursor] = useState<null | number>(0)

  const [fetchUsers, { data, isFetching }] = useLazyGetAllUsersQuery()

  useEffect(() => {
    setUsers([])
    setCursor(0)
    fetchUsers({
      cursor: 0,
      pageNumber: 1,
      pageSize: 10,
      search: router.query.searchTerm ? router.query.searchTerm.toString() : '',
    })
  }, [router.query.searchTerm])

  useEffect(() => {
    if (data?.items) {
      setUsers(prev => [...prev, ...data.items])
      setCursor(data.nextCursor || null)
    }
  }, [data])

  useEffect(() => {
    if (!observerRef.current || !cursor || isFetching) {
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && cursor) {
          fetchUsers({ cursor, pageNumber: 1, pageSize: 10, search: '' })
        }
      },
      { threshold: 1.0 }
    )

    observer.observe(observerRef.current)

    return () => observer.disconnect()
  }, [cursor, isFetching])

  return (
    <div className="flex flex-col sm:p-10 p-5 justify-between h-full">
      <SearchWithQueries placeholder="Find user" />
      {users.map(user => (
        <div className="flex flex-col pt-5" key={user.id}>
          <div className="flex gap-4">
            <Link href={`/public-profile/profile/${user.id}`}>
              <Image
                alt="userAvatar"
                className="rounded-full cursor-pointer"
                height={user.avatars?.[1]?.height || 45}
                src={user.avatars?.[1]?.url || '/avatar.png'}
                width={user.avatars?.[1]?.width || 45}
              />
            </Link>

            <div className="flex flex-col">
              <Link href={`/public-profile/profile/${user.id}`}>
                <span className="underline cursor-pointer">{user.userName}</span>
              </Link>
              <div className="flex gap-2">
                <span>{user.firstName}</span>
                <span>{user.lastName}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="h-10" ref={observerRef} />
    </div>
  )
}

Search.getLayout = getPublicLayoutWithSidebar
export default Search
