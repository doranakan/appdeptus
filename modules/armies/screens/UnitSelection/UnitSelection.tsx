import { skipToken } from '@reduxjs/toolkit/query'
import { useMount, useUnmount } from 'ahooks'
import { FilterTopBar, ScreenContainer, VStack } from 'appdeptus/components'
import { type ArmyBuilder } from 'appdeptus/models'
import { useLocalSearchParams } from 'expo-router'
import pluralize, { singular } from 'pluralize'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useGetArmyListQuery } from '../../api'
import { ArmyBuilderBackground, TopBar } from '../../components'
import { useAllUnits } from '../../hooks'
import UnitList from './UnitList'

const UnitSelectionScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { army } = useGetArmyListQuery(!id ? skipToken : undefined, {
    selectFromResult: ({ data, ...rest }) => ({
      army: data?.find(({ id: armyId }) => armyId === Number(id)),
      ...rest
    })
  })

  const { getValues, reset, watch } = useFormContext<ArmyBuilder>()

  const selectedCodex = watch('codex.name')

  const [selectedType, setSelectedType] =
    useState<(typeof unitTypes)[number]>('character')

  const units = useAllUnits(army?.roster ?? [])

  useMount(() => {
    if (army) {
      reset({ ...army, units })
    }
  })

  useUnmount(() => {
    reset({
      ...getValues(),
      detachment: undefined,
      units: [],
      points: 0
    })
  })

  return (
    <ScreenContainer safeAreaInsets={['bottom']}>
      <ArmyBuilderBackground />
      <VStack
        className='flex-1 px-4 pb-0 pt-4'
        space='md'
      >
        <TopBar
          subtitle='units'
          title={selectedCodex}
        />

        <FilterTopBar
          values={unitTypes.map((type) => pluralize(type))}
          onPress={(type) => {
            setSelectedType(singular(type) as (typeof unitTypes)[number])
          }}
          selectedValue={pluralize(selectedType)}
        />
        <UnitList type={selectedType} />
      </VStack>
    </ScreenContainer>
  )
}

const unitTypes = [
  'character',
  'leader',
  'squad',
  'transport',
  'vehicle'
] as const

export default UnitSelectionScreen
