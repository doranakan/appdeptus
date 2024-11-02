import type { Meta, StoryObj } from '@storybook/react'
import ScreenTitle from './ScreenTitle'

const ScreenTitleMeta: Meta<typeof ScreenTitle> = {
  title: 'ScreenTitle',
  component: ScreenTitle,
  args: {
    children: 'screen title'
  }
}

export default ScreenTitleMeta

type Story = StoryObj<typeof ScreenTitleMeta>

export const Default: Story = {}
