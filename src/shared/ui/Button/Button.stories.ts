import type { Meta, StoryObj } from '@storybook/react'

import Button from '@/shared/ui/Button/Button'
import { fn } from '@storybook/test'

const meta = {
  args: {
    children: 'Button',
    onClick: fn(),
  },
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
}

export const Text: Story = {
  args: {
    variant: 'text',
  },
}
