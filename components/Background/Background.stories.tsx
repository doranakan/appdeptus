import type { Meta, StoryObj } from '@storybook/react'
import Background from './Background'

const CardMeta: Meta<typeof Background> = {
  title: 'Background',
  component: Background,
  args: {
    source: 'sign_in'
  }
}

export default CardMeta

type Story = StoryObj<typeof Background>

export const Default: Story = {}
