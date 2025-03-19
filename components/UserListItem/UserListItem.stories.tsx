import type { Meta, StoryObj } from '@storybook/react'
import UserListItem from './UserListItem'

const UserListItemMeta: Meta<typeof UserListItem> = {
  title: 'UserListItem',
  component: UserListItem,
  args: {
    user: {
      createdAt: '2025-05-03',
      id: '12345-2345',
      name: 'Doranakan',
      image:
        'https://cdnb.artstation.com/p/assets/images/images/025/662/505/large/johannes-helgeson-horusver02-06.jpg?1586525189'
    },
    current: false
  }
}

export default UserListItemMeta

type Story = StoryObj<typeof UserListItem>

export const Default: Story = {}

export const Text: Story = {
  args: {
    user: {
      createdAt: '2025-05-03',
      id: '12345-2345',
      name: 'Doranakan'
    }
  }
}
