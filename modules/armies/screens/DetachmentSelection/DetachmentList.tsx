import {
  Card,
  Error,
  HStack,
  IconBadge,
  Loading,
  Pressable,
  Text,
  themeColors,
  VStack
} from 'appdeptus/components'
import { type ArmyBuilder } from 'appdeptus/models'
import { mapBattleSizeDp } from 'appdeptus/utils'
import { Component } from 'lucide-react-native'
import { memo, useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { FlatList, RefreshControl } from 'react-native'
import { useGetDetachmentListQuery } from '../../api'

const DetachmentList = () => {
  const { setValue, watch } = useFormContext<ArmyBuilder>()

  const selectedCodex = watch('codex')
  const battleSize = watch('battleSize')
  const detachments = watch('detachments')

  const { data, isError, isFetching, refetch } =
    useGetDetachmentListQuery(selectedCodex)

  const dpTotal = mapBattleSizeDp(battleSize)
  const dpUsed =
    detachments?.reduce((acc, d) => acc + d.detachmentPoints, 0) ?? 0

  const handlePress = useCallback(
    (item: NonNullable<typeof data>[number]) => {
      const isSelected = detachments?.some(({ id }) => id === item.id)

      if (isSelected) {
        const updated = detachments.filter(({ id }) => id !== item.id)
        setValue('detachments', updated)
        setValue(
          'units',
          watch('units')?.map((unit) =>
            'enhancement' in unit ? { ...unit, enhancement: undefined } : unit
          )
        )
        return
      }

      if (dpTotal !== null && dpUsed + item.detachmentPoints > dpTotal) {
        return
      }

      const updated = [
        ...(detachments ?? []),
        { ...item, enhancements: item.enhancements ?? [] }
      ]
      setValue('detachments', updated)
    },
    [detachments, dpTotal, dpUsed, setValue, watch]
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
      renderItem={({ item }) => {
        const isSelected = detachments?.some(({ id }) => id === item.id)
        const wouldExceedBudget =
          dpTotal !== null &&
          !isSelected &&
          dpUsed + item.detachmentPoints > dpTotal

        return (
          <Pressable
            disabled={wouldExceedBudget}
            onPress={() => {
              handlePress(item)
            }}
          >
            <Card
              variant={
                isSelected
                  ? 'selected'
                  : wouldExceedBudget
                    ? 'disabled'
                    : 'selectable'
              }
            >
              <HStack
                className='items-center justify-between p-4'
                space='md'
              >
                <HStack
                  className='flex-1 items-center'
                  space='md'
                >
                  <IconBadge Icon={Component} />
                  <Text
                    className='line-clamp-1 flex-1'
                    family='body-bold'
                  >
                    {item.name}
                  </Text>
                </HStack>
                <Text
                  className='uppercase'
                  family='body-bold'
                  size='sm'
                >{`${item.detachmentPoints}dp`}</Text>
              </HStack>
            </Card>
          </Pressable>
        )
      }}
      showsVerticalScrollIndicator={false}
    />
  )
}

export default memo(DetachmentList)
