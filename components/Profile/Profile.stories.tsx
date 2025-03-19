import type { Meta, StoryObj } from '@storybook/react'
import Profile from './Profile'

const ProfileMeta: Meta<typeof Profile> = {
  title: 'Profile',
  component: Profile,
  args: {
    date: '2025-03-05',
    image:
      'https://cdnb.artstation.com/p/assets/images/images/025/662/505/large/johannes-helgeson-horusver02-06.jpg?1586525189',
    name: 'Doranakan',
    variant: 'user'
  }
}

export default ProfileMeta

type Story = StoryObj<typeof Profile>

export const Default: Story = {}
export const Text: Story = {
  args: {
    image: undefined
  }
}
