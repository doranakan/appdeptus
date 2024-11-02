import {
  ArmyListItem,
  FilterTopBar,
  Input,
  themeColors,
  VStack
} from 'appdeptus/components'
import { Search } from 'lucide-react-native'
import { useMemo, useState } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { useGetArmyListQuery } from '../../api'
import Empty from './Empty'
import Error from './Error'
import Loading from './Loading'

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
      .filter(({ points }) =>
        pointFilter === 'all'
          ? true
          : points > lowerLimit && points <= upperLimit
      )
      .filter(({ name }) => name.includes(searchString))
  }, [data, pointFilter, searchString])

  return (
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
        className='container flex-1'
        contentContainerStyle={{ flex: 1 }}
        data={filteredData}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={() => <VStack className='h-4' />}
        ListEmptyComponent={
          isError ? (
            <Error />
          ) : !data && isLoading ? (
            <Loading />
          ) : (
            <Empty variant={data?.length ? 'search' : 'data'} />
          )
        }
        refreshControl={
          <RefreshControl
            tintColor={themeColors.default.primary[300]}
            refreshing={isFetching && !isLoading}
            onRefresh={refetch}
          />
        }
        renderItem={({ item }) => (
          <ArmyListItem
            codex={item.codex.name}
            detachment={item.composition.detachment.name}
            name={item.name}
            points={item.points}
          />
        )}
        scrollEnabled={!isFetching}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
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

export default ArmyList
