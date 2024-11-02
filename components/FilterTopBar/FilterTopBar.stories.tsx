import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import FilterTopBar from './FilterTopBar'

const FilterTopBarMeta: Meta<typeof FilterTopBar> = {
  title: 'FilterTopBar',
  args: {
    onPress: action('onChangeText'),
    selectedValue: 'all',
    values: ['all', '2000pts', '1500pts', '1000pts', '500pts']
  },
  component: FilterTopBar
}

export default FilterTopBarMeta

type Story = StoryObj<typeof FilterTopBar>

export const Default: Story = {}
