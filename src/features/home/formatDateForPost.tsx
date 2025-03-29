import { HomePagePost } from '@/services/home-posts/home-page-types'
import { useTranslation } from '@/shared/hooks/useTranslation'

type FormatDateForPostProps = {
  post: HomePagePost
}

const getTimeString = (value: number, units: string[], suffix: string) => {
  const index = value % 10
  const isTeens = Math.floor(value / 10) % 10 === 1

  if (isTeens) {
    return `${value} ${units[2]} ${suffix}`
  }

  if (index === 1) {
    return `${value} ${units[0]} ${suffix}`
  }

  if (index >= 2 && index <= 4) {
    return `${value} ${units[1]} ${suffix}`
  }

  return `${value} ${units[2]} ${suffix}`
}

export const FormatDateForPost = ({ post }: FormatDateForPostProps) => {
  const { t } = useTranslation()
  const now = new Date()
  const postDate = new Date(post.createdAt)
  const differenceInTime = now.getTime() - postDate.getTime()

  const differenceInMinutes = Math.floor(differenceInTime / (1000 * 60))
  const differenceInHours = Math.floor(differenceInMinutes / 60)
  const differenceInDays = Math.floor(differenceInHours / 24)
  const differenceInMonths = Math.floor(differenceInDays / 30)
  const differenceInYears = Math.floor(differenceInMonths / 12)

  if (differenceInMinutes < 5) {
    return 'сейчас'
  } else if (differenceInMinutes < 60) {
    return getTimeString(
      differenceInMinutes,
      [t.timeAdditionPost.minute, t.timeAdditionPost.minutes, t.timeAdditionPost.minutesPlural],
      t.timeAdditionPost.back
    )
  } else if (differenceInHours < 24) {
    return getTimeString(
      differenceInHours,
      [t.timeAdditionPost.hour, t.timeAdditionPost.hours, t.timeAdditionPost.hoursPlural],
      t.timeAdditionPost.back
    )
  } else if (differenceInDays < 30) {
    return getTimeString(
      differenceInDays,
      [t.timeAdditionPost.day, t.timeAdditionPost.days, t.timeAdditionPost.daysPlural],
      t.timeAdditionPost.back
    )
  } else if (differenceInMonths < 12) {
    return getTimeString(
      differenceInMonths,
      [t.timeAdditionPost.month, t.timeAdditionPost.months, t.timeAdditionPost.monthsPlural],
      t.timeAdditionPost.back
    )
  } else {
    return getTimeString(
      differenceInYears,
      [t.timeAdditionPost.year, t.timeAdditionPost.years, t.timeAdditionPost.yearsPlural],
      t.timeAdditionPost.back
    )
  }
}
