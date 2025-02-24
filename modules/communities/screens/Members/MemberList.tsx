import { Text, themeColors, VStack } from 'appdeptus/components'
import { useLocalSearchParams } from 'expo-router'
import React, { memo } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { useGetCommunityQuery } from '../../api'
import MemberListItem from './MemberListItem'

const MemberList = () => {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { data, isFetching, refetch } = useGetCommunityQuery(id)

  const adminCount = data?.members.filter(({ role }) => role === 'admin').length
  const sortedMembers = data?.members.sort(
    ({ role: a }, { role: b }) =>
      (a === 'admin' ? 0 : 1) - (b === 'admin' ? 0 : 1)
  )

  return (
    <FlatList
      className='flex-1'
      contentContainerClassName='flex-1'
      data={sortedMembers}
      keyExtractor={({ id }) => String(id)}
      ItemSeparatorComponent={() => <VStack className='h-4' />}
      ListFooterComponent={() => <VStack className='h-4' />}
      refreshControl={
        <RefreshControl
          tintColor={themeColors.default.primary[300]}
          refreshing={isFetching}
          onRefresh={refetch}
        />
      }
      renderItem={({ item, index }) => (
        <VStack space='xs'>
          {index === 0 ? (
            <Text
              className='pb-4 uppercase'
              family='body-bold'
            >
              Inquisitor
            </Text>
          ) : null}

          {index === adminCount ? (
            <Text
              className='pb-4 uppercase'
              family='body-bold'
            >
              Adepts
            </Text>
          ) : null}

          <MemberListItem member={item} />
        </VStack>
      )}
      scrollEnabled={!isFetching}
      showsVerticalScrollIndicator={false}
    />
  )
}

export default memo(MemberList)
