import type { Meta, StoryObj } from '@storybook/react'
import Background from './Background'

const BackgroundMeta: Meta<typeof Background> = {
  title: 'Background',
  component: Background,
  args: {
    source: 'sign_in'
  }
}

export default BackgroundMeta

type Story = StoryObj<typeof Background>

export const Default: Story = {}
