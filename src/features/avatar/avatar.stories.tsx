import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from '@/features/avatar/avatar'

const meta = {
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'features/Avatar',
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>
export const AvatarStory: Story = {}
