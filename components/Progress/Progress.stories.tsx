import type { Meta, StoryObj } from '@storybook/react'
import Progress from './Progress'

const ProgressMeta: Meta<typeof Progress> = {
  title: 'Progress',
  component: Progress,
  args: {
    currentStep: 5,
    steps: 10,
    text: 'select codex'
  }
}

export default ProgressMeta

type Story = StoryObj<typeof Progress>

export const Default: Story = {}
