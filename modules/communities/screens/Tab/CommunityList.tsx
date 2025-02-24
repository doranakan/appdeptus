import toxicFree from 'appdeptus/assets/lotties/toxic-free.json'
import {
  EmptyListItem,
  Error,
  Input,
  Loading,
  Text,
  themeColors,
  VStack
} from 'appdeptus/components'
import { Search } from 'lucide-react-native'
import React, { memo, useState } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { useGetCommunityListQuery } from '../../api'
import CommunityListItem from './CommunityListItem'

const CommunityList = () => {
  const [searchString, setSearchString] = useState('')

  const { data, isLoading, isError, isFetching, refetch } =
    useGetCommunityListQuery()

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
        <FlatList
          className='flex-1'
          contentContainerStyle={!data?.length ? { flex: 1 } : undefined}
          data={data}
          keyExtractor={({ id }) => String(id)}
          ItemSeparatorComponent={() => <VStack className='h-4' />}
          ListHeaderComponent={
            <Text
              className='pb-4 uppercase'
              family='body-bold'
            >
              Your communities
            </Text>
          }
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
          renderItem={({ item }) => <CommunityListItem community={item} />}
          scrollEnabled={!isFetching}
          showsVerticalScrollIndicator={false}
        />
      </VStack>
    </>
  )
}

const emptyListLabels = {
  data: {
    subtitle:
      'You are not part of any community! Search for a community or create your own with the "+" button!',
    title: 'Heresy!'
  },
  search: {
    subtitle: 'Your research leads to nothing!',
    title: 'Search error'
  }
} as const

export default memo(CommunityList)
