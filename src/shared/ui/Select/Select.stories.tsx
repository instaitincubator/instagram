import type { Meta, StoryObj } from '@storybook/react'

import Select from '@/shared/ui/Select/Select'
import { fn } from '@storybook/test'

const meta = {
  argTypes: {
    value: {
      control: {
        type: 'text',
      },
    },
  },
  args: {
    onChange: fn(),
    options: [
      {
        label: 'rus',
        value: 'rus',
      },
      {
        label: 'eng',
        value: 'eng',
      },
    ],
  },
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
