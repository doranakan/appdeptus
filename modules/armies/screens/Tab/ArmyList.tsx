import toxicFree from 'appdeptus/assets/lotties/toxic-free.json'
import {
  ArmyListItem,
  EmptyListItem,
  Error,
  FilterTopBar,
  Input,
  Loading,
  Pressable,
  themeColors,
  VStack
} from 'appdeptus/components'
import { Link } from 'expo-router'
import { Search } from 'lucide-react-native'
import React, { memo, useMemo, useState } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { useGetArmyListQuery } from '../../api'
import NewArmyBottomSheet from './NewArmyBottomSheet'

const ArmyList = () => {
  const [searchString, setSearchString] = useState('')
  const [pointFilter, setPointFilter] =
    useState<keyof typeof pointFiltersToLimits>('all')

  const { data, isLoading, isError, isFetching, refetch } =
    useGetArmyListQuery()

  const filteredData = useMemo(() => {
    if (!data) {
      return []
    }

    const { lowerLimit, upperLimit } = pointFiltersToLimits[pointFilter]

    return data
      .filter(
        ({ codex, name }) =>
          name.includes(searchString) || codex.name.includes(searchString)
      )
      .filter(({ points }) =>
        pointFilter === 'all'
          ? true
          : points > lowerLimit && points <= upperLimit
      )
  }, [data, pointFilter, searchString])

  return (
    <>
      <VStack
        className='flex-1'
        space='md'
      >
        <Input
          Icon={Search}
          onChangeText={setSearchString}
          placeholder='Search your library'
          value={searchString}
        />
        <FilterTopBar
          onPress={setPointFilter}
          selectedValue={pointFilter}
          values={
            Array.from(
              Object.keys(pointFiltersToLimits)
            ) as (keyof typeof pointFiltersToLimits)[]
          }
        />
        <FlatList
          className='flex-1'
          contentContainerStyle={!data?.length ? { flex: 1 } : undefined}
          data={filteredData}
          keyExtractor={({ id }) => String(id)}
          ItemSeparatorComponent={() => <VStack className='h-4' />}
          ListEmptyComponent={
            isError ? (
              <Error />
            ) : !data && isLoading ? (
              <Loading />
            ) : (
              <EmptyListItem
                lottieSource={toxicFree}
                subtitle={
                  emptyListLabels[data?.length ? 'search' : 'data'].subtitle
                }
                title={emptyListLabels[data?.length ? 'search' : 'data'].title}
              />
            )
          }
          ListFooterComponent={() => <VStack className='h-4' />}
          refreshControl={
            <RefreshControl
              tintColor={themeColors.default.primary[300]}
              refreshing={isFetching && !isLoading}
              onRefresh={refetch}
            />
          }
          renderItem={({ item }) => (
            <Link
              asChild
              href={`army/${item.id}`}
            >
              <Pressable>
                <ArmyListItem
                  codex={item.codex.name}
                  detachment={item.detachment.name}
                  name={item.name}
                  points={item.points}
                />
              </Pressable>
            </Link>
          )}
          scrollEnabled={!isFetching}
          showsVerticalScrollIndicator={false}
        />
      </VStack>
      <NewArmyBottomSheet />
    </>
  )
}

const pointFiltersToLimits = {
  all: {
    lowerLimit: 0,
    upperLimit: 99999
  },
  '2000pts': {
    lowerLimit: 1900,
    upperLimit: 2000
  },
  '1500pts': {
    lowerLimit: 1400,
    upperLimit: 1500
  },
  '1000pts': {
    lowerLimit: 900,
    upperLimit: 1000
  },
  '500pts': {
    lowerLimit: 400,
    upperLimit: 500
  }
} as const satisfies Record<
  string,
  {
    lowerLimit: number
    upperLimit: number
  }
>

const emptyListLabels = {
  data: {
    subtitle: 'You have no army!\nPress "+" to add your first.',
    title: 'Heresy!'
  },
  search: {
    subtitle: 'Your research leads to nothing!',
    title: 'Search error'
  }
} as const

export default memo(ArmyList)
