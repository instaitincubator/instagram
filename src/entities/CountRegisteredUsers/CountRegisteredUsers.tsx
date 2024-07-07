import React from 'react'

import { CountRegisteredUsersProps } from '@/shared/types/public.types'

const CountRegisteredUsers = ({ count }: CountRegisteredUsersProps) => {
  const arrayNumbers = Array.from('0' + '0' + '0' + count?.toString(), Number)

  return (
    <div className="flex justify-between flex-wrap items-center bg-dark-500 py-[12px] px-[24px] border border-dark-300 rounded-sm">
      <h1 className="text-h1">Registered users:</h1>
      <div className="border border-dark-300 bg-dark-700 rounded-sm flex">
        <div className="px-[12px] py-[12px] flex items-center">
          {arrayNumbers.map((el, index) => {
            return (
              <div className="[&:not(:last-child)]:border-r border-dark-300 px-[7px]" key={index}>
                <h2 className="text-[18px]">{el}</h2>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CountRegisteredUsers
