import { FilterTopBar, ScreenContainer, VStack } from 'appdeptus/components'
import { type ArmyBuilder } from 'appdeptus/models'
import pluralize, { singular } from 'pluralize'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ArmyBuilderBackground, TopBar } from '../../components'
import Header from './Header'
import UnitList from './UnitList'

const UnitSelectionScreen = () => {
  const { watch } = useFormContext<ArmyBuilder>()

  const selectedCodex = watch('codex.name')
  const selectedDetachment = watch('detachment')

  const [selectedType, setSelectedType] =
    useState<(typeof unitTypes)[number]>('character')

  return (
    <ScreenContainer
      className='overflow-hidden'
      safeAreaInsets={['bottom', 'top']}
    >
      <ArmyBuilderBackground />
      <VStack
        className='flex-1 px-4 pb-0 pt-4'
        space='md'
      >
        <Header />

        <TopBar
          subtitle={selectedDetachment.name}
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
