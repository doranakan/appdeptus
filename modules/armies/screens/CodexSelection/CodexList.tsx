import {
  Error,
  Loading,
  setTheme,
  TabMenu,
  themeColors,
  VStack
} from 'appdeptus/components'
import { CustomFadeIn, CustomFadeOut, type factions } from 'appdeptus/constants'
import { type ArmyBuilder, type Codex } from 'appdeptus/models'
import { memo, useCallback, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { RefreshControl } from 'react-native'
import Animated, { Easing, LinearTransition } from 'react-native-reanimated'
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

  const { setValue, watch } = useFormContext<ArmyBuilder>()

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
      <Animated.FlatList
        data={filteredData}
        contentContainerStyle={!data?.length ? { flex: 1 } : undefined}
        ItemSeparatorComponent={() => <VStack className='h-4' />}
        ListEmptyComponent={() =>
          isError ? <Error /> : isFetching ? <Loading /> : null
        }
        ListFooterComponent={() => <VStack className='h-8' />}
        keyExtractor={({ id }) => String(id)}
        refreshControl={
          isError ? (
            <RefreshControl
              tintColor={themeColors.default.primary[300]}
              refreshing={isFetching && !isLoading}
              onRefresh={refetch}
            />
          ) : undefined
        }
        itemLayoutAnimation={LinearTransition.easing(Easing.out(Easing.cubic))
          .duration(300)
          .delay(100)}
        renderItem={({ item }) => (
          <Animated.View
            exiting={CustomFadeOut}
            entering={CustomFadeIn}
          >
            <CodexListItem
              codex={item}
              onPress={handlePress}
              selected={
                selectedCodex === undefined
                  ? undefined
                  : selectedCodex === item.name
              }
            />
          </Animated.View>
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
