export const hasDateFormat = (message: string) => {
  const dateRegex = /\b\d{2}\/\d{2}\/\d{4}\b/ // Регулярное выражение для формата MM/DD/YYYY

  return dateRegex.test(message)
}
