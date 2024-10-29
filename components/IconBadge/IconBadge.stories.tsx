import type { Meta, StoryObj } from '@storybook/react'
import { Skull } from 'lucide-react-native'
import IconBadge from './IconBadge'

const IconBadgeMeta: Meta<typeof IconBadge> = {
  title: 'IconBadge',
  component: () => <IconBadge Icon={Skull} />
}

export default IconBadgeMeta

type Story = StoryObj<typeof IconBadge>

export const Default: Story = {}
