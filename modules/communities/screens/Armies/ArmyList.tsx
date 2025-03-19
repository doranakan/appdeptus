import {
  ArmyListItem,
  Error,
  Loading,
  Pressable,
  Text,
  themeColors,
  VStack
} from 'appdeptus/components'
import clsx from 'clsx'
import { Link, useLocalSearchParams } from 'expo-router'
import { memo } from 'react'
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import { useGetCommunityArmyListQuery } from '../../api'

const ArmyList = () => {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { data, isFetching, isError, isLoading, refetch } =
    useGetCommunityArmyListQuery(id)

  return (
    <FlatList
      className='flex-1'
      contentContainerClassName={clsx(!data?.length && 'flex-1')}
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
              "The members in this community have no public armies or maybe no armies at all, that's heresy!"
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
          href={`army/${item.id}`}
        >
          <Pressable>
            <ArmyListItem
              codex={item.codex.name}
              detachment={item.detachment.name}
              name={item.name}
              points={item.points}
              isValid={item.isValid}
              shareBy={item.user}
            />
          </Pressable>
        </Link>
      )}
      scrollEnabled={!isFetching}
      showsVerticalScrollIndicator={false}
    />
  )
}

export default memo(ArmyList)
