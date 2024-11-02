import type { Meta, StoryObj } from '@storybook/react'
import ScreenSubtitle from './ScreenSubtitle'

const ScreenSubtitleMeta: Meta<typeof ScreenSubtitle> = {
  title: 'ScreenSubtitle',
  component: ScreenSubtitle,
  args: {
    children: 'screen subtitle'
  }
}

export default ScreenSubtitleMeta

type Story = StoryObj<typeof ScreenSubtitleMeta>

export const Default: Story = {}
