import {
  bottomSheetRef,
  Error,
  Loading,
  themeColors,
  VStack
} from 'appdeptus/components'
import { type ArmyBuilder, type SelectableUnit } from 'appdeptus/models'
import { uniqueId } from 'lodash'
import React, { memo, useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FlatList, type ListRenderItem, RefreshControl } from 'react-native'
import { useGetUnitListQuery } from '../../api'
import UnitCustomizationBottomSheet from './UnitCustomizationBottomSheet'
import UnitListItem from './UnitListItem'

type UnitListProps = {
  type: 'character' | 'leader' | 'squad' | 'transport' | 'vehicle'
}

const UnitList = ({ type }: UnitListProps) => {
  const { setValue, watch } = useFormContext<ArmyBuilder>()

  const selectedCodex = watch('codex.id')

  const { filteredData, isError, isFetching, refetch } = useGetUnitListQuery(
    selectedCodex,
    {
      selectFromResult: ({ data, ...rest }) => ({
        ...rest,
        filteredData: data?.filter(({ type: t }) => t === type)
      })
    }
  )

  const handleAdd = useCallback(
    (unit: SelectableUnit) => {
      setUnitToEdit(unit)

      const selectedUnits = watch('units')
      const points = watch('points')

      setValue('units', [
        ...selectedUnits,
        {
          ...unit,
          type,
          tier: unit.tiers[0],
          upgrades: [],
          selectionId: uniqueId()
        }
      ])
      setValue('points', points + unit.tiers[0].points)
    },
    [setValue, type, watch]
  )

  const [unitToEdit, setUnitToEdit] = useState<SelectableUnit | undefined>()

  const handleEdit = useCallback((unit: SelectableUnit) => {
    setUnitToEdit(unit)
    bottomSheetRef.current?.present()
  }, [])

  const renderItem = useCallback<ListRenderItem<SelectableUnit>>(
    ({ item }) => {
      const selectedUnits = watch('units')?.filter(
        ({ name }) => item.name === name
      )

      return (
        <UnitListItem
          selectedUnits={selectedUnits.length ? selectedUnits : undefined}
          onPressAdd={handleAdd}
          onPressEdit={handleEdit}
          unit={item}
        />
      )
    },
    [handleAdd, handleEdit, watch]
  )

  return (
    <>
      <FlatList
        data={filteredData}
        contentContainerStyle={!filteredData?.length ? { flex: 1 } : undefined}
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
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      {unitToEdit ? (
        <UnitCustomizationBottomSheet selectedUnit={unitToEdit} />
      ) : null}
    </>
  )
}

export default memo(UnitList)