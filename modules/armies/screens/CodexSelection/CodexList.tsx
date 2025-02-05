import {
  Error,
  Loading,
  setTheme,
  TabMenu,
  themeColors,
  VStack
} from 'appdeptus/components'
import { CustomFadeIn, CustomFadeOut, type factions } from 'appdeptus/constants'
import { useFeatureFlag } from 'appdeptus/hooks'
import { type ArmyBuilder, type Codex } from 'appdeptus/models'
import { useAppDispatch } from 'appdeptus/store'
import { memo, useCallback, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { RefreshControl } from 'react-native'
import Animated, { Easing, LinearTransition } from 'react-native-reanimated'
import { useGetCodexListQuery } from '../../api'
import CodexListItem from './CodexListItem'

const CodexList = () => {
  const disabledArmies = useFeatureFlag('disabled-armies')

  const { data, isFetching, isError, isLoading, refetch } =
    useGetCodexListQuery(undefined, {
      selectFromResult: (res) => ({
        ...res,
        data: res.data?.filter(({ name }) => !disabledArmies?.includes(name))
      })
    })

  const [selectedFactions, setSelectedFactions] =
    useState<(typeof factionFilter)[number]>('all')

  const filteredData = useMemo(
    () =>
      selectedFactions === 'all'
        ? data
        : data?.filter(({ faction }) => faction === selectedFactions),
    [data, selectedFactions]
  )

  const { getValues, reset, setValue, watch } = useFormContext<ArmyBuilder>()

  const [selectedCodex, detachment] = watch(['codex.name', 'detachment'])

  const dispatch = useAppDispatch()

  const handlePress = useCallback(
    (codex: Codex) => {
      if (detachment && selectedCodex !== codex.name) {
        reset({
          ...getValues(),
          name: '',
          detachment: undefined,
          units: [],
          points: 0
        })
      }

      setValue('codex', codex)

      dispatch(setTheme(codex.name))
    },
    [detachment, dispatch, getValues, reset, selectedCodex, setValue]
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
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          isError ? (
            <RefreshControl
              tintColor={themeColors.default.primary[300]}
              refreshing={isFetching && !isLoading}
              onRefresh={refetch}
            />
          ) : undefined
        }
        contentContainerClassName='gap-4'
      >
        {isError ? (
          <Error />
        ) : isFetching ? (
          <Loading />
        ) : (
          filteredData?.map((item) => (
            <Animated.View
              key={String(item.id)}
              exiting={CustomFadeOut}
              entering={CustomFadeIn}
              layout={LinearTransition.easing(Easing.out(Easing.cubic))
                .duration(300)
                .delay(100)}
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
          ))
        )}
        <VStack className='h-8' />
      </Animated.ScrollView>
    </VStack>
  )
}

const factionFilter = ['all', 'imperium', 'chaos', 'xenos'] as const satisfies (
  | 'all'
  | (typeof factions)[number]
)[]

export default memo(CodexList)
