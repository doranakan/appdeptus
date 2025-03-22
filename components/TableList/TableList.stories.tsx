import type { Meta, StoryObj } from '@storybook/react'
import Text from '../Text'
import TableList from './TableList'

const TableListMeta: Meta<typeof TableList> = {
  title: 'TableList',
  decorators: (Story) => (
    <Story
      args={{
        data: ['One', 'Two', 'Three'],
        keyExtractor: (item) => String(item),
        renderItem: ({ item }) => (
          <Text className='w-full px-4'>{String(item)}</Text>
        )
      }}
    />
  ),
  component: TableList
}

export default TableListMeta

type Story = StoryObj<typeof TableList>

export const Default: Story = {}
