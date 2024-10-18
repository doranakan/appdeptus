import type { Meta, StoryObj } from '@storybook/react'
import Badge from './Badge'

const BadgeMeta: Meta<typeof Badge> = {
  title: 'Badge',
  component: Badge,
  args: {
    text: 'Badge'
  }
}

export default BadgeMeta

type Story = StoryObj<typeof Badge>

export const Default: Story = {}
export const Army: Story = {
  args: {
    codex: 'Adepta Sororitas'
  }
}
