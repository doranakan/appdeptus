import type { Meta, StoryObj } from '@storybook/react'
import { StoryContainer } from '../storybook'
import Button from './Button'

const ButtonMeta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  args: {
    text: 'For the Emperor!'
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
