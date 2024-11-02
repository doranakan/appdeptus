import { skipToken } from '@reduxjs/toolkit/query'
import {
  Card,
  Error,
  Loading,
  Pressable,
  Text,
  themeColors,
  VStack
} from 'appdeptus/components'
import { type NewArmy } from 'appdeptus/models'
import { useFormContext, useWatch } from 'react-hook-form'
import { FlatList, RefreshControl } from 'react-native'
import { useGetDetachmentListQuery } from '../../api'

const DetachmentList = () => {
  const { setValue } = useFormContext<NewArmy>()

  const watch = useWatch<NewArmy>()

  const selectedCodex = watch.codex?.id

  const { data, isError, isFetching, refetch } = useGetDetachmentListQuery(
    selectedCodex ?? skipToken
  )

  return (
    <FlatList
      data={data}
      contentContainerStyle={!data?.length ? { flex: 1 } : undefined}
      ItemSeparatorComponent={() => <VStack className='h-4' />}
      ListEmptyComponent={() =>
        isError ? <Error /> : isFetching ? <Loading /> : null
      }
      ListFooterComponent={() => <VStack className='h-8' />}
      keyExtractor={({ id }) => id}
      refreshControl={
        isError ? (
          <RefreshControl
            tintColor={themeColors.default.primary[300]}
            refreshing={isFetching}
            onRefresh={refetch}
          />
        ) : undefined
      }
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            setValue('composition.detachment', item)
          }}
        >
          <Card
            variant={
              item.id === watch.composition?.detachment?.id
                ? 'selected'
                : 'selectable'
            }
          >
            <VStack className='p-4'>
              <Text family='body-bold'>{item.name}</Text>
            </VStack>
          </Card>
        </Pressable>
      )}
      showsVerticalScrollIndicator={false}
    />
  )
}

export default DetachmentList
