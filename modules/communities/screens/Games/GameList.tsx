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
import { useGetCommunityGameListQuery } from '../../api'

const GameList = () => {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { data, isError, isLoading, isFetching, refetch } =
    useGetCommunityGameListQuery(id)

  return (
    <FlatList
      className='flex-1'
      contentContainerStyle={!data?.length ? { flex: 1 } : undefined}
      data={data}
      keyExtractor={({ id }) => String(id)}
      ItemSeparatorComponent={() => <VStack className='h-4' />}
      ListEmptyComponent={
        isError ? (
          <Error />
        ) : !data && isLoading ? (
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
  )
}

export default memo(GameList)
