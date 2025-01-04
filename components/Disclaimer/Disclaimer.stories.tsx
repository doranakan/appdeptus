import type { Meta, StoryObj } from '@storybook/react'
import Disclaimer from './Disclaimer'

const DisclaimerMeta: Meta<typeof Disclaimer> = {
  title: 'Disclaimer',
  component: Disclaimer,
  args: {}
}

export default DisclaimerMeta

type Story = StoryObj<typeof DisclaimerMeta>

export const Default: Story = {}
