import { Text, themeColors, VStack } from 'appdeptus/components'
import { useLocalSearchParams } from 'expo-router'
import { sortBy } from 'lodash'
import React, { memo } from 'react'
import { RefreshControl } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useGetCommunityQuery } from '../../api'
import MemberListItem from './MemberListItem'

const MemberList = () => {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { data, isFetching, refetch } = useGetCommunityQuery(id)

  const adminCount = data?.members.filter(({ role }) => role === 'admin').length
  const sortedMembers = sortBy(data?.members, 'role')

  return (
    <FlatList
      className='flex-1'
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
