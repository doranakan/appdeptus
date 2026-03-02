import noWar from 'appdeptus/assets/lotties/no-war.json'
import {
  EmptyListItem,
  Error,
  Loading,
  Text,
  themeColors,
  VStack
} from 'appdeptus/components'
import clsx from 'clsx'
import { memo } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { useGetUserTournamentListQuery } from '../../api'
import TournamentListItem from './TournamentListItem'

const TournamentList = () => {
  const { data, isLoading, isError, isFetching, refetch } =
    useGetUserTournamentListQuery()

  return (
    <FlatList
      className='flex-1'
      contentContainerClassName={clsx(!data?.length ? 'flex-1' : undefined)}
      data={data}
      keyExtractor={({ id }) => String(id)}
      ItemSeparatorComponent={() => <VStack className='h-4' />}
      ListHeaderComponent={
        <Text
          className='pb-4 uppercase'
          family='body-bold'
        >
          All tournaments
        </Text>
      }
      ListEmptyComponent={
        isError ? (
          <Error />
        ) : !data && isLoading ? (
          <Loading />
        ) : (
          <EmptyListItem
            lottieSource={noWar}
            subtitle='No battles scheduled yet. Create one with the "+" button!'
            title='No tournaments'
          />
        )
      }
      ListFooterComponent={() => <VStack className='h-4' />}
      refreshControl={
        <RefreshControl
          refreshing={isFetching && !isLoading}
          tintColor={themeColors.default.primary[300]}
          onRefresh={refetch}
        />
      }
      renderItem={({ item }) => <TournamentListItem tournament={item} />}
      showsVerticalScrollIndicator={false}
    />
  )
}

export default memo(TournamentList)
