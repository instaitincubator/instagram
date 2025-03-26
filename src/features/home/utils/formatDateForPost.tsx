export const formatDateForPost = (date: string) => {
  const now = new Date()
  const postDate = new Date(date)
  const differenceInTime = now.getTime() - postDate.getTime()

  const differenceInSeconds = Math.floor(differenceInTime / 1000)
  const differenceInMinutes = Math.floor(differenceInSeconds / 60)
  const differenceInHours = Math.floor(differenceInMinutes / 60)
  const differenceInDays = Math.floor(differenceInHours / 24)
  const differenceInMonths = Math.floor(differenceInDays / 30)
  const differenceInYears = Math.floor(differenceInMonths / 12)

  if (differenceInSeconds < 60) {
    return `${differenceInSeconds} секунд${differenceInSeconds === 1 ? 'у' : 'ы'} назад`
  } else if (differenceInMinutes < 60) {
    return `${differenceInMinutes} минут${differenceInMinutes === 1 ? 'у' : 'ы'} назад`
  } else if (differenceInHours < 24) {
    return `${differenceInHours} час${differenceInHours === 1 ? 'а' : 'ов'} назад`
  } else if (differenceInDays < 30) {
    let ending

    if (differenceInDays === 1) {
      ending = 'день'
    } else if (differenceInDays === 2 || differenceInDays === 3 || differenceInDays === 4) {
      ending = 'дня'
    } else {
      ending = 'дней'
    }

    return `${differenceInDays} ${ending} назад`
  } else if (differenceInMonths < 12) {
    return `${differenceInMonths} месяц${differenceInMonths === 1 ? ' ' : 'а'} назад`
  } else {
    return `${differenceInYears} год${differenceInYears === 1 ? ' ' : 'а'} назад`
  }
}
