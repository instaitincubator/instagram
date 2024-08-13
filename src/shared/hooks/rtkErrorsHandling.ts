import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

interface CustomErrorData {
  error: string
  messages: {
    field: string
    message: string
  }[]
  statusCode: number
}

interface ErrorMessage {
  field: string
  message: string
}

export const rtkErrorHandling = (error: FetchBaseQueryError | SerializedError): ErrorMessage => {
  let errorMessage: ErrorMessage = {
    field: '',
    message: '',
  }

  if (error && 'data' in error && typeof error.data === 'object' && error.data !== null) {
    const errorData = error.data as CustomErrorData

    if (errorData.messages[0].field === 'userName') {
      errorMessage = errorData.messages[0]
    } else if (errorData.messages[0].field === 'email') {
      errorMessage = errorData.messages[0]
    }
  }

  return errorMessage
}
