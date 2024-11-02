import {
  Error,
  Loading,
  TabMenu,
  themeColors,
  VStack
} from 'appdeptus/components'
import { type factions } from 'appdeptus/constants'
import { memo, useMemo, useState } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { useGetCodexListQuery } from '../../api'
import CodexListItem from './CodexListItem'

const CodexList = () => {
  const { data, isFetching, isError, isLoading, refetch } =
    useGetCodexListQuery()

  const [selectedFactions, setSelectedFactions] =
    useState<(typeof factionFilter)[number]>('all')

  const filteredData = useMemo(
    () =>
      selectedFactions === 'all'
        ? data
        : data?.filter(({ faction }) => faction === selectedFactions),
    [data, selectedFactions]
  )
  return (
    <VStack
      className='flex-1'
      space='lg'
    >
      <TabMenu
        onOptionSelected={setSelectedFactions}
        options={factionFilter}
      />
      <FlatList
        data={filteredData}
        contentContainerStyle={!data?.length ? { flex: 1 } : undefined}
        ItemSeparatorComponent={() => <VStack className='h-4' />}
        ListEmptyComponent={() =>
          isError ? <Error /> : isFetching ? <Loading /> : null
        }
        ListFooterComponent={() => <VStack className='h-8' />}
        keyExtractor={({ id }) => id}
        refreshControl={
          isError ? (
            <RefreshControl
              tintColor={themeColors.default.primary[300]}
              refreshing={isFetching && !isLoading}
              onRefresh={refetch}
            />
          ) : undefined
        }
        renderItem={({ item }) => <CodexListItem codex={item} />}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  )
}

const factionFilter = ['all', 'imperium', 'chaos', 'xenos'] as const satisfies (
  | 'all'
  | (typeof factions)[number]
)[]

export default memo(CodexList)
