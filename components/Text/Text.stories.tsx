import type { Meta, StoryObj } from '@storybook/react'
import Text from './Text'

const TextMeta: Meta<typeof Text> = {
  title: 'Text',
  component: Text,
  args: {
    children: 'For the Emperor!'
  }
}

export default TextMeta

type Story = StoryObj<typeof Text>

export const Default: Story = {}
export const Medium: Story = {
  args: {
    family: 'body-medium'
  }
}
export const Bold: Story = {
  args: {
    family: 'body-bold'
  }
}
export const Heading: Story = {
  args: {
    family: 'heading-regular'
  }
}
