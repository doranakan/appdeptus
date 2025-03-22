import type { Meta, StoryObj } from '@storybook/react'
import { Check } from 'lucide-react-native'
import NavigationHeader from './NavigationHeader'

const NavigationHeaderMeta: Meta<typeof NavigationHeader> = {
  title: 'NavigationHeader',
  component: NavigationHeader,
  args: {
    variant: 'backButton'
  }
}

export default NavigationHeaderMeta

type Story = StoryObj<typeof NavigationHeader>

export const Default: Story = {}
export const Avatar: Story = {
  args: {
    variant: 'avatar',
    user: {
      createdAt: '',
      id: '',
      name: 'doranakan',
      image:
        'https://cdnb.artstation.com/p/assets/images/images/025/662/505/large/johannes-helgeson-horusver02-06.jpg?1586525189'
    }
  }
}
export const RightButton: Story = {
  args: {
    rightButton: {
      disabled: true,
      onPress: () => {},
      icon: Check,
      variant: 'callback',
      notifications: 0
    }
  }
}
export const Progress: Story = {
  args: {
    ...RightButton.args,
    progress: {
      currentStep: 2,
      steps: 3,
      text: 'progress'
    }
  }
}
export const Title: Story = {
  args: {
    ...RightButton.args,
    title: 'Header Title'
  }
}
