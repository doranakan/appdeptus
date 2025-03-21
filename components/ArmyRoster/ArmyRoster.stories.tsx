import type { Meta, StoryObj } from '@storybook/react'
import { VStack } from '../ui'
import ArmyRoster from './ArmyRoster'

const ArmyRosterMeta: Meta<typeof ArmyRoster> = {
  title: 'ArmyRoster',
  component: (props) => (
    <VStack className='h-full w-full'>
      <ArmyRoster {...props} />
    </VStack>
  ),
  args: {
    roster: [
      {
        id: 0,
        name: 'Angron',
        selectionId: '0',
        tier: {
          id: 0,
          models: 1,
          points: 435
        },
        upgrades: [],
        type: 'character',
        warlord: true,
        hero: true
      },
      {
        id: 1,
        name: 'Khorne Berzerkers',
        selectionId: '1',
        tier: {
          id: 1,
          models: 10,
          points: 180
        },
        upgrades: [],
        type: 'squad'
      },
      {
        id: 2,
        name: 'Jakhals',
        selectionId: '2',
        tier: {
          id: 2,
          models: 20,
          points: 160
        },
        upgrades: [],
        type: 'squad'
      }
    ]
  }
}

export default ArmyRosterMeta

type Story = StoryObj<typeof ArmyRoster>

export const Default: Story = {}
