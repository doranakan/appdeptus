import type { Meta, StoryObj } from '@storybook/react'
import Loading from './Loading'

const LoadingMeta: Meta<typeof Loading> = {
  title: 'Loading',
  component: Loading,
  args: {}
}

export default LoadingMeta

type Story = StoryObj<typeof LoadingMeta>

export const Default: Story = {}
