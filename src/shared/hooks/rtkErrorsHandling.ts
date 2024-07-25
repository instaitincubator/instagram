import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

interface CustomErrorData {
  error: string
  messages: {
    message: string
  }[]
  statusCode: number
}

export const rtkErrorHandling = (error: FetchBaseQueryError | SerializedError) => {
  let errorMessage = ''

  if (error && 'data' in error) {
    const customErrorData = error.data as CustomErrorData

    errorMessage = customErrorData.messages[0].message
  }

  return errorMessage
}
