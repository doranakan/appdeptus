import type { Meta, StoryObj } from '@storybook/react'
import NotificationBadge from './NotificationBadge'

const NotificationBadgeMeta: Meta<typeof NotificationBadge> = {
  title: 'NotificationBadge',
  component: NotificationBadge,
  args: {
    count: 10
  }
}

export default NotificationBadgeMeta

type Story = StoryObj<typeof NotificationBadge>

export const Default: Story = {}
