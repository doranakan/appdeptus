import type { Meta, StoryObj } from '@storybook/react'
import Avatar from './Avatar'

const AvatarMeta: Meta<typeof Avatar> = {
  title: 'Avatar',
  component: Avatar,
  args: {
    user: {
      id: '',
      name: 'doranakan',
      image:
        'https://cdnb.artstation.com/p/assets/images/images/025/662/505/large/johannes-helgeson-horusver02-06.jpg?1586525189'
    }
  }
}

export default AvatarMeta

type Story = StoryObj<typeof Avatar>

export const Default: Story = {}
export const Fallback: Story = {
  args: {
    user: {
      id: '',
      name: 'doranakan',
      image: undefined
    }
  }
}
