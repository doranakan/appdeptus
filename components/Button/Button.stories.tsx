import type { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import Button from './Button'

const ButtonMeta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  args: {
    text: 'Hello world'
  },
  decorators: [
    (Story) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    )
  ]
}

export default ButtonMeta

export const Enabled: StoryObj<typeof Button> = {}

export const Disabled: StoryObj<typeof Button> = {
  args: {
    disabled: true
  }
}
