import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Datepicker } from './Datepicker'

const meta = {
  component: Datepicker,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  title: 'UI/Datepicker',
} satisfies Meta<typeof Datepicker>

type Story = StoryObj<typeof meta>

export default meta

export const Default: Story = {
  render: () => {
    const [stardDate, setStardDate] = useState<Date | null>(new Date())
    const [endDate, setEndDate] = useState<Date | null>(new Date())

    return (
      <div>
        <Datepicker onChange={date => setStardDate(date)} selected={stardDate} selectsStart />
        <Datepicker onChange={date => setEndDate(date)} selected={endDate} selectsEnd />
      </div>
    )
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Label: Story = {
  args: {
    label: 'This is a customizable label',
  },
}

//1,option  ,create  array  and for this condition ->
//2.
