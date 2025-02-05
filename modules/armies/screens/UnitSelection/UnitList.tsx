import { Error, Loading, themeColors, VStack } from 'appdeptus/components'
import {
  type ArmyBuilder,
  type SelectableUnit,
  type Unit
} from 'appdeptus/models'
import * as Crypto from 'expo-crypto'
import React, { memo, useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FlatList, type ListRenderItem, RefreshControl } from 'react-native'
import { useGetUnitListQuery } from '../../api'
import UnitCustomizationBottomSheet from './UnitCustomizationBottomSheet'
import UnitListItem from './UnitListItem'
import ref from './ref'

type UnitListProps = {
  type: 'character' | 'squad' | 'vehicle' | 'monster'
}

const UnitList = ({ type }: UnitListProps) => {
  const { setValue, watch } = useFormContext<ArmyBuilder>()

  const selectedCodex = watch('codex')

  const { filteredData, isError, isFetching, refetch } = useGetUnitListQuery(
    selectedCodex,
    {
      selectFromResult: ({ data, ...rest }) => ({
        ...rest,
        filteredData: data?.filter(({ type: t }) => {
          switch (type) {
            case 'character':
              return t === 'character' || t === 'leader'
            case 'monster':
            case 'vehicle':
              return t === 'monster' || t === 'vehicle' || t === 'transport'
            default:
              return t === type
          }
        })
      })
    }
  )

  const handleAdd = useCallback(
    (unit: SelectableUnit) => {
      setUnitToEdit(unit)

      const selectedUnits = watch('units')
      const points = watch('points')

      const { tiers: _, ...rest } = unit

      setValue('units', [
        ...selectedUnits,
        {
          ...rest,
          type,
          tier: unit.tiers[0],
          upgrades: [],
          selectionId: Crypto.randomUUID()
        } as unknown as Unit
      ])

      setValue('points', points + unit.tiers[0].points)
    },
    [setValue, type, watch]
  )

  const [unitToEdit, setUnitToEdit] = useState<SelectableUnit | undefined>()

  const handleEdit = useCallback((unit: SelectableUnit) => {
    setUnitToEdit(unit)
    ref.current?.present()
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
