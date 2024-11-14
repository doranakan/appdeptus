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
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { type ListRenderItem, RefreshControl, UIManager } from 'react-native'
import Animated, { Easing, LinearTransition } from 'react-native-reanimated'
import { useDispatch } from 'react-redux'
import { useGetCodexListQuery } from '../../api'
import CodexListItem from './CodexListItem'

const itemLayoutAnimation = LinearTransition.easing(Easing.out(Easing.cubic))
  .duration(300)
  .delay(100)

const CodexList = () => {
  const { data, isFetching, isError, isLoading, refetch } =
    useGetCodexListQuery()

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental?.(true)
  }, [])

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

  const renderItem = useCallback<ListRenderItem<Codex>>(
    ({ item }) => (
      <Animated.View
        exiting={CustomFadeOut}
        entering={CustomFadeIn}
      >
        <CodexListItem
          codex={item}
          onPress={handlePress}
          selected={selectedCodex === item.name}
        />
      </Animated.View>
    ),
    [handlePress, selectedCodex]
  )

  return (
    <VStack
      className='flex-1'
      space='lg'
    >
      <TabMenu
        // @ts-expect-error it is compatible but ts says no
        onOptionSelected={setSelectedFactions}
        options={factionFilter}
      />

      <Animated.FlatList
        data={filteredData}
        ListEmptyComponent={() =>
          isError ? <Error /> : isFetching ? <Loading /> : null
        }
        contentContainerClassName='gap-4'
        ListFooterComponent={() => <VStack className='h-8' />}
        keyExtractor={({ id }) => id.toString()}
        refreshControl={
          isError ? (
            <RefreshControl
              tintColor={themeColors.default.primary[300]}
              refreshing={isFetching && !isLoading}
              onRefresh={refetch}
            />
          ) : undefined
        }
        itemLayoutAnimation={itemLayoutAnimation}
        renderItem={renderItem}
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
