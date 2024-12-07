import type { Meta, StoryObj } from '@storybook/react'
import TextLink from './TextLink'

const TextLinkMeta: Meta<typeof TextLink> = {
  title: 'TextLink',
  component: TextLink,
  args: {
    href: '',
    children: 'For the Emperor!'
  }
}

export default TextLinkMeta

type Story = StoryObj<typeof TextLink>

export const Default: Story = {}
