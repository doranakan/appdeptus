import type { Meta, StoryObj } from '@storybook/react'
import GameDataTable from './GameDataTable'

const GameDataTableMeta: Meta<typeof GameDataTable> = {
  title: 'GameDataTable',
  component: GameDataTable,
  args: {
    data: [
      {
        title: 'Warlord',
        valueL: 'Angron',
        valueR: "Lion El'Johnson"
      },
      {
        title: 'Points',
        valueL: '2000PTS',
        valueR: '1990PTS'
      }
    ]
  }
}

export default GameDataTableMeta

type Story = StoryObj<typeof GameDataTable>

export const Default: Story = {}
