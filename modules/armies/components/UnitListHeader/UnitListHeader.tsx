import { ArmyIcon, SquareContainer } from 'appdeptus/components'
import { Box } from 'appdeptus/components/ui/box'
import { HStack } from 'appdeptus/components/ui/hstack'
import { Text } from 'appdeptus/components/ui/text'
import { VStack } from 'appdeptus/components/ui/vstack'
import { type ArmyForm, type Codex } from 'appdeptus/models'
import { useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useGetCodexUnitsQuery } from '../../api'
import CreateArmyHeader from './CreateArmyHeader'
import UpdateArmyHeader from './UpdateArmyHeader'

type UnitListHeaderProps = {
  codex: Codex

  armyId?: string
}

const UnitListHeader = ({ armyId, codex }: UnitListHeaderProps) => {
  const { data } = useGetCodexUnitsQuery(codex.id)

  const { setValue, watch } = useFormContext<ArmyForm>()

  const units = watch('units')

  const totalPoints = useMemo(() => {
    let points = 0
    for (const { unit, tier } of units) {
      points +=
        data?.find(({ id }) => id === unit)?.tiers.find(({ id }) => id === tier)
          ?.points ?? 0
    }

    return points
  }, [data, units])

  useEffect(() => {
    setValue('totalPoints', totalPoints)
  }, [setValue, totalPoints])

  return (
    <HStack>
      <VStack className='-left-54 absolute w-16'>
        <VStack className='items-start gap-8'>
          <SquareContainer>
            <ArmyIcon
              codexName={codex.name}
              color='secondary700'
              h={32}
              w={32}
            />
          </SquareContainer>
        </VStack>
      </VStack>
      <HStack className='top-73 -left-54 absolute w-full'>
        <Box className='bg-secondary-700 h-[2px] left-38 absolute top-21 w-full' />
        <SquareContainer>
          <VStack className='items-center justify-center'>
            <Text
              bold
              size='xs'
            >
              {totalPoints}
            </Text>
            <Text
              bold
              size='xs'
            >
              pts
            </Text>
          </VStack>
        </SquareContainer>
      </HStack>
      <VStack className='flex-1'>
        {armyId ? <UpdateArmyHeader armyId={armyId} /> : <CreateArmyHeader />}
      </VStack>
    </HStack>
  )
}

export default UnitListHeader
