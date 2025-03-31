import { Heart, OutlinedHeart } from '../../../public'

interface Props {
  isLiked: boolean
  onLike?: () => void
}

export const LikesImagesWithUserList = ({ isLiked, onLike }: Props) => {
  return (
    <div className="cursor-pointer relative" onClick={onLike}>
      {!isLiked && <OutlinedHeart />}
      {isLiked && <Heart />}
    </div>
  )
}
