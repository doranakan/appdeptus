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
import { useFormContext } from 'react-hook-form'
import { FlatList, RefreshControl } from 'react-native'
import { useGetDetachmentListQuery } from '../../api'

const DetachmentList = () => {
  const { setValue, watch } = useFormContext<ArmyBuilder>()

  const selectedCodex = watch('codex.id')

  const { data, isError, isFetching, refetch } =
    useGetDetachmentListQuery(selectedCodex)

  const detachment = watch('detachment')

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
            const points = watch('points')
            const units = watch('units')

            const detachmentPoints =
              detachment?.enhancements.reduce(
                (acc, { points }) => (points ? (acc += points) : acc),
                0
              ) ?? 0

            setValue('points', points - detachmentPoints)
            setValue('detachment', { ...item, enhancements: [] })
            setValue(
              'units',
              units?.map((unit) => {
                if ('enhancement' in unit) {
                  return {
                    ...unit,
                    enhancement: undefined
                  }
                }
                return unit
              })
            )
          }}
        >
          <Card
            variant={item.id === detachment?.id ? 'selected' : 'selectable'}
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
