import { ChangeEvent, useState } from 'react'

export interface ImageValidationOptions {
  allowedFileTypes?: string[]
  maxFileSize?: number // в байтах
}

interface returnValue {
  error?: string
  isValid: boolean
}
export const validateImageUpload = (
  e: ChangeEvent<HTMLInputElement>,
  options: ImageValidationOptions = {}
): returnValue => {
  const { allowedFileTypes = ['image/jpeg', 'image/png'], maxFileSize = 10 * 1024 * 1024 } = options

  if (e.target.files) {
    const file = e.target.files[0]

    if (!allowedFileTypes.includes(file.type)) {
      return {
        error: 'Error! The format of the uploaded photo must be PNG and JPEG',
        isValid: false,
      }
    }
    // Проверка размера файла
    if (file.size > maxFileSize) {
      return {
        error: 'Error! Photo size must be less than 10 MB!',
        isValid: false,
      }
    }

    // Проверка типа файла

    return {
      isValid: true,
    }
  }

  return {
    isValid: false,
  }
}
