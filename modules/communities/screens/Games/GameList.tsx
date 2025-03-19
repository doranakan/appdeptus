import { skipToken } from '@reduxjs/toolkit/query'
import {
  Error,
  GameListItem,
  Loading,
  Pressable,
  Text,
  themeColors,
  VStack
} from 'appdeptus/components'
import { Link, useLocalSearchParams } from 'expo-router'
import { memo } from 'react'
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import { useGetCommunityGameListQuery, useGetCommunityQuery } from '../../api'

const GameList = () => {
  const { id } = useLocalSearchParams<{ id: string }>()

  const {
    data: community,
    isError: isErrorCommunity,
    isFetching: isFetchingCommunity,
    refetch: refetchCommunity
  } = useGetCommunityQuery(id)

  const {
    data,
    isError: isErrorGames,
    isLoading: isLoadingGames,
    isFetching: isFetchingGame,
    refetch: refetchGames
  } = useGetCommunityGameListQuery(community?.id ?? skipToken)

  return (
    <FlatList
      className='flex-1'
      contentContainerStyle={!data?.length ? { flex: 1 } : undefined}
      data={data}
      keyExtractor={({ id }) => String(id)}
      ItemSeparatorComponent={() => <VStack className='h-4' />}
      ListEmptyComponent={
        isErrorGames || isErrorCommunity ? (
          <Error />
        ) : (!data && isLoadingGames) || isFetchingCommunity ? (
          <Loading />
        ) : (
          <Text>
            {
              "The members of this community never played a game against each others, that's Heresy!"
            }
          </Text>
        )
      }
      ListFooterComponent={() => <VStack className='h-4' />}
      refreshControl={
        <RefreshControl
          tintColor={themeColors.default.primary[300]}
          refreshing={isFetchingGame && !isLoadingGames}
          onRefresh={isErrorCommunity ? refetchCommunity : refetchGames}
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
      scrollEnabled={!isFetchingGame}
      showsVerticalScrollIndicator={false}
    />
  )
}

export default memo(GameList)
