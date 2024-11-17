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
import { type ArmyBuilder } from 'appdeptus/models'
import { memo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { FlatList, RefreshControl } from 'react-native'
import { useGetDetachmentListQuery } from '../../api'

const DetachmentList = () => {
  const { setValue } = useFormContext<ArmyBuilder>()

  const watch = useWatch<ArmyBuilder>()

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
      keyExtractor={({ id }) => String(id)}
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
            const points =
              watch.detachment?.enhancements?.reduce(
                (acc, { points }) => (points ? (acc += points) : acc),
                0
              ) ?? 0

            setValue('points', watch.points ? watch.points - points : 0)
            setValue('detachment', { ...item, enhancements: [] })
          }}
        >
          <Card
            variant={
              item.id === watch.detachment?.id ? 'selected' : 'selectable'
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

export default memo(DetachmentList)
