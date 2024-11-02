import {
  Error,
  Loading,
  setTheme,
  TabMenu,
  themeColors,
  VStack
} from 'appdeptus/components'
import { type factions } from 'appdeptus/constants'
import { type Codex, type NewArmy } from 'appdeptus/models'
import { memo, useCallback, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FlatList, RefreshControl } from 'react-native'
import { useDispatch } from 'react-redux'
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

  const { setValue, watch } = useFormContext<NewArmy>()

  const selectedCodex = watch('codex.name')

  const dispatch = useDispatch()

  const handlePress = useCallback(
    (codex: Codex) => {
      setValue('codex', codex)

      dispatch(setTheme(codex.name))
    },
    [dispatch, setValue]
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
        renderItem={({ item }) => (
          <CodexListItem
            codex={item}
            onPress={handlePress}
            selected={selectedCodex === item.name}
          />
        )}
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
