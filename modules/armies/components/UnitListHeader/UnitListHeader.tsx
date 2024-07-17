import { Box, HStack, Text, VStack } from '@gluestack-ui/themed'
import { ArmyIcon, SquareContainer } from 'appdeptus/components'
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
      <VStack
        left={-54}
        position='absolute'
        w='$16'
      >
        <VStack
          alignItems='flex-start'
          gap='$8'
        >
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
      <HStack
        top={73}
        left={-54}
        position='absolute'
        w='$full'
      >
        <Box
          bg='$secondary700'
          h={2}
          left={38}
          position='absolute'
          top={21}
          w='$full'
        />
        <SquareContainer>
          <VStack
            alignItems='center'
            justifyContent='center'
          >
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

      <VStack flex={1}>
        {armyId ? <UpdateArmyHeader armyId={armyId} /> : <CreateArmyHeader />}
      </VStack>
    </HStack>
  )
}

export default UnitListHeader
