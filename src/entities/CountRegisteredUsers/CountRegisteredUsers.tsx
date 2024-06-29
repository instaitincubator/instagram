import React from 'react'

type PropsType = {
  count: number | undefined
}
const CountRegisteredUsers = ({ count }: PropsType) => {
  const arrayNumbers = Array.from('0' + '0' + '0' + count?.toString(), Number)

  return (
    <div className="flex justify-between flex-wrap items-center bg-dark-500 py-[12px] px-[24px] border border-dark-300 rounded-sm">
      <h1 className="text-h1">Registered users:</h1>
      <div className="border border-dark-300 bg-dark-700 rounded-sm flex">
        <div className="h-[48px] px-[12px] flex items-center">
          {arrayNumbers.map((el, index) => {
            return (
              <div className="[&:not(:last-child)]:border-r border-dark-300 px-[7px]" key={index}>
                <p className="text-[18px] ">{el}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CountRegisteredUsers
