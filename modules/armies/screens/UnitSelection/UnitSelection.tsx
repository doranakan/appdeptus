import { useUnmount } from 'ahooks'
import { FilterTopBar, ScreenContainer, VStack } from 'appdeptus/components'
import { type ArmyBuilder, type Unit } from 'appdeptus/models'
import pluralize, { singular } from 'pluralize'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useGetUnitListQuery } from '../../api'
import { ArmyBuilderBackground, TopBar } from '../../components'
import { useUnitTypes } from '../../hooks'
import UnitList from './UnitList'

const UnitSelectionScreen = () => {
  const { getValues, reset, watch } = useFormContext<ArmyBuilder>()

  const codex = watch('codex')

  const { data } = useGetUnitListQuery(codex)

  const unitTypes = useUnitTypes(data ?? [])

  useEffect(() => {
    if (unitTypes?.[0]) {
      setSelectedType(unitTypes[0])
    }
  }, [data, unitTypes])

  const [selectedType, setSelectedType] = useState<Unit['type']>('character')

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
          title={codex.name}
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
