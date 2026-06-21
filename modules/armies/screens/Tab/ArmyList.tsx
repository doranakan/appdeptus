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
import { type BattleSize } from 'appdeptus/models'
import { battleSizeLabels } from 'appdeptus/utils'
import clsx from 'clsx'
import { Link } from 'expo-router'
import { Search } from 'lucide-react-native'
import { memo, useMemo, useState } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { useGetArmyListQuery } from '../../api'
import NewArmyBottomSheet from './NewArmyBottomSheet'

const ArmyList = () => {
  const [searchString, setSearchString] = useState('')
  const [battleSizeFilter, setBattleSizeFilter] = useState<'all' | BattleSize>(
    'all'
  )

  const { data, isLoading, isError, isFetching, refetch } =
    useGetArmyListQuery()

  const filteredData = useMemo(() => {
    if (!data) {
      return []
    }

    return data
      .filter(
        ({ codex, name }) =>
          name.includes(searchString) || codex.name.includes(searchString)
      )
      .filter(({ battleSize }) =>
        battleSizeFilter === 'all' ? true : battleSize === battleSizeFilter
      )
  }, [data, battleSizeFilter, searchString])

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
          labels={battleSizeLabels}
          onPress={setBattleSizeFilter}
          selectedValue={battleSizeFilter}
          values={['all', 'incursion', 'strike-force', 'free'] as const}
        />
        <FlatList
          className='flex-1'
          contentContainerClassName={clsx(!data?.length && 'flex-1')}
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
                  battleSize={item.battleSize}
                  name={item.name}
                  points={item.points}
                  isValid={item.isValid}
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
