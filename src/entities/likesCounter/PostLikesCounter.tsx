import { LikesImagesWithUserList } from '@/entities/likesCounter/LikesImagesWithUserList'
import {
  useGetPostLikeStatusQuery,
  useUpdatePostLikeStatusMutation,
} from '@/entities/likesCounter/queries/likes-api'
import Image from 'next/image'

interface Props {
  postId: number
}

export const PostLikesCounter = ({ postId }: Props) => {
  const { data: postLikeStatus } = useGetPostLikeStatusQuery(postId)
  const [updatePostLikeStatus] = useUpdatePostLikeStatusMutation()

  const onLike = () => {
    if (postId) {
      updatePostLikeStatus({
        likeStatus: postLikeStatus?.isLiked ? 'NONE' : 'LIKE',
        postId,
      })
    }
  }

  const likesMouseOutHandler = () => {}

  const likesMouseOverHandler = () => {}

  return (
    <div className="flex gap-2 relative items-center" onMouseOut={e => {}} onMouseOver={e => {}}>
      <div className="flex relative">
        {postLikeStatus?.items.slice(-3).map((userLiked, index) => {
          return (
            <Image
              alt="likersAvatar"
              className={`rounded-full z-[${10 + 10 * -index}] first:ml-0 ml-[-5px] flex`}
              height={20}
              key={index}
              src={userLiked.avatars.length > 1 ? userLiked.avatars[1].url : '/avatar.png'}
              width={20}
            />
          )
        })}
      </div>
      {postLikeStatus?.items.length}
      <LikesImagesWithUserList isLiked={postLikeStatus?.isLiked!} onLike={onLike} />
      {/*<div className="absolute bottom-[100% + 10px] px-3 py-2 border-amber-100 bg-dark-100 "></div>*/}
    </div>
  )
}
