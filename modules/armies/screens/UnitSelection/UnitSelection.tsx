import { skipToken } from '@reduxjs/toolkit/query'
import { useUnmount } from 'ahooks'
import {
  FilterTopBar,
  Loading,
  ScreenContainer,
  VStack
} from 'appdeptus/components'
import { useAllUnits } from 'appdeptus/hooks'
import { type ArmyBuilder } from 'appdeptus/models'
import { useLocalSearchParams } from 'expo-router'
import pluralize, { singular } from 'pluralize'
import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { useGetArmyQuery } from '../../api'
import { ArmyBuilderBackground, TopBar } from '../../components'
import UnitList from './UnitList'

const UnitSelectionScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data: army, isLoading } = useGetArmyQuery(id ?? skipToken)

  const { getValues, reset } = useFormContext<ArmyBuilder>()

  const watch = useWatch<ArmyBuilder>()

  const selectedCodex = watch.codex?.name

  const [selectedType, setSelectedType] =
    useState<(typeof unitTypes)[number]>('character')

  const units = useAllUnits(army?.roster ?? [])

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
