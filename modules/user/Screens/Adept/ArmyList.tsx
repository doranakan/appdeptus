import {
  ArmyListItem,
  Error,
  Loading,
  Pressable,
  Text,
  themeColors,
  VStack
} from 'appdeptus/components'
import { type UserProfile } from 'appdeptus/models'
import { useGetUserArmyListQuery } from 'appdeptus/modules/armies/api'
import clsx from 'clsx'
import { Link } from 'expo-router'
import { memo } from 'react'
import { FlatList, RefreshControl } from 'react-native-gesture-handler'

type ArmyListProps = {
  userId: UserProfile['id']
}

const ArmyList = ({ userId }: ArmyListProps) => {
  const { data, isFetching, isError, isLoading, refetch } =
    useGetUserArmyListQuery(userId)

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
              "This user has no public armies or maybe no armies at all, that's heresy!"
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
