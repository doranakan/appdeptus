import type { Meta, StoryObj } from '@storybook/react'
import { StoryContainer } from '../Storybook'
import Button from './Button'

const ButtonMeta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  args: {
    text: 'Hello world'
  },
  decorators: [
    (Story) => (
      <StoryContainer>
        <Story />
      </StoryContainer>
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
