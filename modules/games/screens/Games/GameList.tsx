import {
  EmptyListItem,
  Error,
  FilterTopBar,
  Loading,
  Pressable,
  themeColors,
  VStack
} from 'appdeptus/components'
import { type EndedGame } from 'appdeptus/models/game'
import { Link } from 'expo-router'
import { useMemo, useState } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { useGetGameListQuery } from '../../api'
import GameListItem from './GameListItem'

const GameList = () => {
  const { data, isLoading, isError, isFetching, refetch } = useGetGameListQuery(
    undefined,
    {
      selectFromResult: ({ data, ...rest }) => ({
        ...rest,
        data: data?.filter<EndedGame>(
          (game): game is EndedGame => game.status === 'ended'
        )
      })
    }
  )

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
        className='container flex-1'
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
              subtitle='You never played a game!\nPress "⚔️" to start your first.'
              title='Heresy!'
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
            href={`games/${item.id}`}
          >
            <Pressable disabled>
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
