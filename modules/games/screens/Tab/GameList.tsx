import noWar from 'appdeptus/assets/lotties/no-war.json'
import {
  EmptyListItem,
  Error,
  FilterTopBar,
  Loading,
  Pressable,
  themeColors,
  VStack
} from 'appdeptus/components'
import { Link } from 'expo-router'
import { useMemo, useState } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { useGetEndedGameListQuery } from '../../api'
import GameListItem from './GameListItem'

const GameList = () => {
  const { data, isLoading, isError, isFetching, refetch } =
    useGetEndedGameListQuery()

  const [selectedFilter, setSelectedFilter] =
    useState<(typeof winLossFilter)[number]>('all')

  const filteredData = useMemo(() => {
    if (!data) {
      return []
    }

    if (selectedFilter === 'all') {
      return data
    }

    return data.filter(({ playerOne, playerTwo }) =>
      selectedFilter === 'win'
        ? playerOne.score > playerTwo.score
        : playerOne.score < playerTwo.score
    )
  }, [data, selectedFilter])

  return (
    <VStack
      className='flex-1'
      space='md'
    >
      <FilterTopBar
        onPress={setSelectedFilter}
        selectedValue={selectedFilter}
        values={winLossFilter}
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
              lottieSource={noWar}
              subtitle={
                "You have never faced the trials of war!\nPress '⚔️' to step onto the battlefield for the first time!"
              }
              title='By the Emperor’s light!'
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
            href={`game/${item.id}`}
          >
            <Pressable>
              <GameListItem game={item} />
            </Pressable>
          </Link>
        )}
        scrollEnabled={!isFetching}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  )
}

const winLossFilter = ['all', 'win', 'loss'] as const

export default GameList
