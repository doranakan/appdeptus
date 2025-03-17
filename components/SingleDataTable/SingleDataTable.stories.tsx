import type { Meta, StoryObj } from '@storybook/react'
import SingleDataTable from './SingleDataTable'

const SingleDataTableMeta: Meta<typeof SingleDataTable> = {
  title: 'SingleDataTable',
  component: SingleDataTable,
  args: {
    data: [
      {
        title: 'Warlord',
        value: "Lion El'Johnson"
      },
      {
        title: 'Points',
        value: '1990PTS'
      }
    ]
  }
}

export default SingleDataTableMeta

type Story = StoryObj<typeof SingleDataTable>

export const Default: Story = {}
