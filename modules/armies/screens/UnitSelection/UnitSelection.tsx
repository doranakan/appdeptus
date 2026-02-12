import {
  Error,
  Loading,
  ScreenContainer,
  TabMenu,
  VStack
} from 'appdeptus/components'
import { type ArmyBuilder } from 'appdeptus/models'
import pluralize, { singular } from 'pluralize'
import {
  type ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useFormContext } from 'react-hook-form'
import { useGetUnitListQuery } from '../../api'
import { ArmyBuilderBackground, TopBar } from '../../components'
import { useUnitTypes } from '../../hooks'
import UnitList from './UnitList'

const UnitSelectionScreen = () => {
  const { watch } = useFormContext<ArmyBuilder>()

  const codex = watch('codex')

  const { data } = useGetUnitListQuery(codex)

  const unitTypes = useUnitTypes(data ?? [], codex.name)

  useEffect(() => {
    if (unitTypes?.[0]) {
      setSelectedType(unitTypes[0])
    }
  }, [data, unitTypes])

  const [selectedType, setSelectedType] =
    useState<(typeof unitTypes)[number]>('character')

  const { units, isError, isFetching, refetch } = useGetUnitListQuery(codex, {
    selectFromResult: ({ data, ...rest }) => ({
      ...rest,
      units: data?.filter(({ type: t }) => {
        switch (selectedType) {
          case 'character':
            return t === 'character' || t === 'leader'
          case 'monster':
          case 'vehicle':
            return t === 'vehicle' || t === 'transport'
          case 'troop':
            return t === 'squad'
          default:
            return t === selectedType
        }
      })
    })
  })

  const types = useMemo(
    () => unitTypes.map((type) => pluralize(type)),
    [unitTypes]
  )

  const onTypeSelected = useCallback<
    ComponentProps<typeof TabMenu>['onOptionSelected']
  >((type) => {
    setSelectedType(singular(type) as (typeof unitTypes)[number])
  }, [])

  if (isFetching) {
    return (
      <ScreenContainer>
        <Loading />
      </ScreenContainer>
    )
  }
  if (isError) {
    return (
      <ScreenContainer>
        <Error
          button={{
            onPress: refetch,
            variant: 'callback',
            text: 'retry'
          }}
          description='There was an error with your request.'
        />
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
          title={codex.name}
        />

        {unitTypes && unitTypes.length > 1 ? (
          <TabMenu
            options={types}
            onOptionSelected={onTypeSelected}
          />
        ) : null}

        <UnitList units={units ?? []} />
      </VStack>
    </ScreenContainer>
  )
}

export default UnitSelectionScreen
