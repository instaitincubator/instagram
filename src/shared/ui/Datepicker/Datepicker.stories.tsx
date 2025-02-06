import type { Meta, StoryObj } from '@storybook/react'

import { DateObject } from 'react-multi-date-picker' // ✅ Import DateObject

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

export const Defaultn: Story = {
  render: () => {
    const [seletedDate, setSelectedDate] = useState<Date | Date[] | null>([])

    return (
      <Datepicker
        multiple
        onChange={date => {
          if (!date) {
            setSelectedDate(null) // No date selected
          } else if (Array.isArray(date)) {
            setSelectedDate(
              date.flat().map(d => (d instanceof DateObject ? d.toDate() : d)) // 🔥 Fix: Flatten array to avoid nesting
            )
          } else {
            setSelectedDate(date instanceof DateObject ? date.toDate() : date) // Convert single DateObject
          }
        }}
        value={seletedDate}
      />
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
