import { VStack } from 'appdeptus/components'
import {
  type ArmyBuilder,
  type SelectableUnit,
  type Unit
} from 'appdeptus/models'
import * as Crypto from 'expo-crypto'
import React, { memo, useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { type ListRenderItem } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import UnitCustomizationBottomSheet from './UnitCustomizationBottomSheet'
import UnitListItem from './UnitListItem'
import ref from './ref'

type UnitListProps = {
  units: SelectableUnit[]
}

const UnitList = ({ units }: UnitListProps) => {
  const { setValue, watch } = useFormContext<ArmyBuilder>()

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
          tier: unit.tiers[0],
          upgrades: [],
          selectionId: Crypto.randomUUID()
        } as unknown as Unit
      ])

      setValue('points', points + unit.tiers[0].points)
    },
    [setValue, watch]
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
        data={units}
        contentContainerStyle={!units?.length ? { flex: 1 } : undefined}
        ItemSeparatorComponent={() => <VStack className='h-4' />}
        ListFooterComponent={() => <VStack className='h-8' />}
        keyExtractor={({ id }) => String(id)}
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
