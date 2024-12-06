export const isOlderThan13 = (dateOfBirth: Date) => {
  if (!dateOfBirth) {
    return true
  }
  const today = new Date()
  const age = today.getFullYear() - dateOfBirth.getFullYear()
  const monthDiff = today.getMonth() - dateOfBirth.getMonth()

  return (
    age > 13 ||
    (age === 13 && monthDiff > 0) ||
    (age === 13 && monthDiff === 0 && today.getDate() >= dateOfBirth.getDate())
  )
}
