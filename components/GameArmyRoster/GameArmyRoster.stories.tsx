import type { Meta, StoryObj } from '@storybook/react'
import { VStack } from '../ui'
import GameArmyRoster from './GameArmyRoster'

const GameArmyRosterMeta: Meta<typeof GameArmyRoster> = {
  title: 'GameArmyRoster',
  component: (props) => (
    <VStack className='h-full w-full'>
      <GameArmyRoster {...props} />
    </VStack>
  ),
  args: {
    army: {
      id: 0,
      name: 'World Eaters',
      points: 775,
      battleSize: 'free',
      codex: { id: 1, name: 'World Eaters', faction: 'chaos' },
      detachments: [{ id: 1, name: 'Disciples of the Eightfold Path', enhancements: [], detachmentPoints: 0 }],
      roster: [
        {
          id: 0,
          name: 'Angron',
          selectionId: '0',
          models: [{ killed: false, wounds: 1 }],
          points: 435,
          upgrades: [],
          type: 'character',
          warlord: true,
          hero: true
        },
        {
          id: 1,
          name: 'Khorne Berzerkers',
          selectionId: '1',
          models: [
            { killed: false, wounds: 0 },
            { killed: false, wounds: 0 },
            { killed: false, wounds: 0 },
            { killed: false, wounds: 0 },
            { killed: false, wounds: 0 }
          ],
          points: 180,
          upgrades: [],
          type: 'squad',
          battleline: false
        },
        {
          id: 2,
          name: 'Jakhals',
          selectionId: '2',
          models: [
            { killed: false, wounds: 0 },
            { killed: false, wounds: 0 },
            { killed: false, wounds: 0 },
            { killed: false, wounds: 0 },
            { killed: false, wounds: 0 },
            { killed: false, wounds: 0 },
            { killed: false, wounds: 0 },
            { killed: true, wounds: 0 },
            { killed: true, wounds: 0 },
            { killed: true, wounds: 0 }
          ],
          points: 160,
          upgrades: [],
          type: 'squad',
          battleline: false
        }
      ]
    }
  }
}

export default GameArmyRosterMeta

type Story = StoryObj<typeof GameArmyRoster>

export const Default: Story = {}
