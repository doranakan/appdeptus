import clsx from 'clsx'
import { memo, type ComponentProps } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { HStack } from '../ui'

type TableListProps<T> = Pick<
  ComponentProps<typeof FlatList<T>>,
  | 'data'
  | 'renderItem'
  | 'ListHeaderComponent'
  | 'keyExtractor'
  | 'ListEmptyComponent'
>

const TableList = <T,>({ renderItem, data, ...props }: TableListProps<T>) => (
  <FlatList
    {...props}
    data={data}
    className='flex-1'
    contentContainerClassName='flex-1'
    renderItem={(args) => (
      <HStack
        className={clsx([
          'items-center justify-between py-2',
          args.index % 2 !== 0 && 'bg-primary-900'
        ])}
      >
        {renderItem?.(args)}
      </HStack>
    )}
    ItemSeparatorComponent={() => (
      <HStack className='h-[1] w-full bg-primary-50/30' />
    )}
  />
)

export default memo(TableList) as typeof TableList
