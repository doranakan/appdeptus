import {
  ArmyBackground,
  Error,
  Loading,
  setTheme,
  TabMenu,
  Text,
  themeColors,
  VStack
} from 'appdeptus/components'
import { CustomFadeIn, CustomFadeOut, type factions } from 'appdeptus/constants'
import { useFeatureFlag } from 'appdeptus/hooks'
import { type ArmyBuilder, type Codex } from 'appdeptus/models'
import { useAppDispatch } from 'appdeptus/store'
import { LinearGradient } from 'expo-linear-gradient'
import { memo, useCallback, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { RefreshControl } from 'react-native'
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  LinearTransition
} from 'react-native-reanimated'
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
      <VStack className='flex-1 overflow-hidden bg-primary-900'>
        {selectedCodex ? (
          <Animated.View
            key={selectedCodex}
            entering={FadeIn}
            exiting={FadeOut}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          >
            <ArmyBackground codex={selectedCodex} />
          </Animated.View>
        ) : null}
        <LinearGradient
          colors={[
            themeColors[selectedCodex ?? 'default'].primary[950],
            `${themeColors[selectedCodex ?? 'default'].primary[950]}00`
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ width: '100%', height: 80, position: 'absolute', top: 0 }}
        />
        <LinearGradient
          colors={[
            themeColors[selectedCodex ?? 'default'].primary[950],
            `${themeColors[selectedCodex ?? 'default'].primary[950]}00`
          ]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={{
            width: '100%',
            height: 130,
            position: 'absolute',
            bottom: 0
          }}
        />
        <VStack className='flex-1 flex-col-reverse px-4'>
          {selectedCodex ? (
            <Text
              className='shadow-md'
              family='heading-regular'
              size='5xl'
            >
              {selectedCodex}
            </Text>
          ) : (
            <Text
              className='shadow-md'
              family='body-bold'
              size='xl'
            >
              Select codex:
            </Text>
          )}
        </VStack>
      </VStack>

      <VStack>
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          refreshControl={
            isError ? (
              <RefreshControl
                tintColor={themeColors.default.primary[300]}
                refreshing={isFetching && !isLoading}
                onRefresh={refetch}
              />
            ) : undefined
          }
          contentContainerClassName='gap-4 px-4'
        >
          {isError ? (
            <Error />
          ) : isFetching ? (
            <Loading />
          ) : (
            filteredData?.map((item) => (
              <Animated.View
                className='h-24 w-24 rounded-3xl bg-primary-50'
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

      <VStack className='px-4'>
        <TabMenu
          onOptionSelected={setSelectedFactions}
          options={factionFilter}
        />
      </VStack>
    </VStack>
  )
}

const factionFilter = ['all', 'imperium', 'chaos', 'xenos'] as const satisfies (
  | 'all'
  | (typeof factions)[number]
)[]

export default memo(CodexList)
