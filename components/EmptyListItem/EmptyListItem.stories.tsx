import type { Meta, StoryObj } from '@storybook/react'
import toxicFree from 'appdeptus/assets/lotties/toxic-free.json'
import EmptyListItem from './EmptyListItem'

const EmptyListItemMeta: Meta<typeof EmptyListItem> = {
  title: 'EmptyListItem',
  component: EmptyListItem,
  args: {
    lottieSource: toxicFree,
    subtitle: 'You have no army!\nPress "+" to add your first.',
    title: 'Heresy!'
  }
}

export default EmptyListItemMeta

type Story = StoryObj<typeof EmptyListItemMeta>

export const Default: Story = {}
