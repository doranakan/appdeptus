import { skipToken } from '@reduxjs/toolkit/query'
import { useUnmount } from 'ahooks'
import {
  FilterTopBar,
  Loading,
  ScreenContainer,
  VStack
} from 'appdeptus/components'
import { useAllUnits } from 'appdeptus/hooks'
import { type ArmyBuilder, type Unit } from 'appdeptus/models'
import { useLocalSearchParams } from 'expo-router'
import pluralize, { singular } from 'pluralize'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useGetArmyQuery, useGetUnitListQuery } from '../../api'
import { ArmyBuilderBackground, TopBar } from '../../components'
import { useUnitTypes } from '../../hooks'
import UnitList from './UnitList'

const UnitSelectionScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data: army, isLoading } = useGetArmyQuery(id ?? skipToken)

  const { getValues, reset, watch } = useFormContext<ArmyBuilder>()

  const selectedCodex = watch().codex

  const units = useAllUnits(army?.roster ?? [])

  const { data } = useGetUnitListQuery(selectedCodex ?? skipToken)

  const unitTypes = useUnitTypes(data ?? [])

  useEffect(() => {
    if (unitTypes?.[0]) {
      setSelectedType(unitTypes[0])
    }
  }, [data, unitTypes])

  const [selectedType, setSelectedType] = useState<Unit['type']>('character')

  useEffect(() => {
    if (army) {
      reset({ ...army, units })
    }
  }, [army, reset, units])

  useUnmount(() => {
    reset({
      ...getValues(),
      detachment: undefined,
      units: [],
      points: 0
    })
  })

  if (isLoading || !selectedCodex) {
    return (
      <ScreenContainer className='items-center justify-center'>
        <Loading />
      </ScreenContainer>
    )
  }

  return (
    <ScreenContainer safeAreaInsets={['bottom']}>
      <ArmyBuilderBackground />
      <VStack
        className='flex-1 px-4 pb-0 pt-4'
        space='md'
      >
        <TopBar
          subtitle='units'
          title={selectedCodex.name}
        />

        {unitTypes && unitTypes.length > 1 ? (
          <FilterTopBar
            values={unitTypes.map((type) => pluralize(type))}
            onPress={(type) => {
              setSelectedType(singular(type) as (typeof unitTypes)[number])
            }}
            selectedValue={pluralize(selectedType)}
          />
        ) : null}
        <UnitList type={selectedType} />
      </VStack>
    </ScreenContainer>
  )
}

export default UnitSelectionScreen
