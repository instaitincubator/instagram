import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Datepicker } from './Datepicker'

// const meta = {
//   component: Datepicker,
//   parameters: {
//     layout: 'centered',
//   },
//   tags: ['autodocs'],
//   title: 'UI/Datepicker',
// } satisfies Meta<typeof Datepicker>

// export default meta

// type Story = StoryObj<typeof meta>

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
    const [seletedDate, setSelectedDate] = useState<Date | null>(null)

    return <Datepicker onChange={date => setSelectedDate(date)} selected={seletedDate} />
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Label: Story = {
  args: {
    label: 'look at me',
  },
}
