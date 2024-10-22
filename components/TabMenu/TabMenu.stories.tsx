import type { Meta, StoryObj } from '@storybook/react'
import TabMenu from './TabMenu'

const TabMenuMeta: Meta<typeof TabMenu> = {
  title: 'TabMenu',
  component: TabMenu,
  args: {
    onOptionSelected: () => {},
    options: ['enhancements', 'units', 'other']
  }
}

export default TabMenuMeta

type Story = StoryObj<typeof TabMenuMeta>

export const Default: Story = {}
