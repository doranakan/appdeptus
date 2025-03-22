import type { Meta, StoryObj } from '@storybook/react'
import DoubleDataTable from './DoubleDataTable'

const DoubleDataTableMeta: Meta<typeof DoubleDataTable> = {
  title: 'DoubleDataTable',
  component: DoubleDataTable,
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

export default DoubleDataTableMeta

type Story = StoryObj<typeof DoubleDataTable>

export const Default: Story = {}
