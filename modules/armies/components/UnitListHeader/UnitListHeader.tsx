import { Box, HStack, Heading, VStack } from '@gluestack-ui/themed'
import { ArmyIcon } from 'appdeptus/components'
import { type ArmyForm, type Codex } from 'appdeptus/models'
import { useEffect, useMemo, type PropsWithChildren } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useGetCodexUnitsQuery } from '../../api'
import CreateArmyHeader from './CreateArmyHeader'
import UpdateArmyHeader from './UpdateArmyHeader'

type UnitListHeaderProps = {
  codex: Codex

  armyId?: string
}

const UnitListHeader = ({ armyId, codex }: UnitListHeaderProps) => {
  const insets = useSafeAreaInsets()

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
        mt={insets.top}
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
            />
          </SquareContainer>
        </VStack>
      </VStack>
      <HStack
        bottom={-21}
        left={-54}
        position='absolute'
        w='$full'
      >
        <Box
          bg='$secondary700'
          h={2}
          left={53}
          position='absolute'
          top={21}
          w='$full'
        />
        <SquareContainer>
          <VStack
            alignItems='center'
            justifyContent='center'
          >
            <Heading size='xs'>{totalPoints}</Heading>
            <Heading
              size='xs'
              textTransform='uppercase'
            >
              pts
            </Heading>
          </VStack>
        </SquareContainer>
      </HStack>

      <VStack flex={1}>
        {armyId ? <UpdateArmyHeader armyId={armyId} /> : <CreateArmyHeader />}
      </VStack>
    </HStack>
  )
}

const SquareContainer = ({ children }: PropsWithChildren) => (
  <VStack
    bgColor='$white'
    borderColor='$secondary700'
    borderWidth='$1'
    h='$11'
    w='$11'
    transform={[
      {
        rotate: '45 deg'
      }
    ]}
  >
    <VStack
      p='$1'
      transform={[
        {
          rotate: '-45 deg'
        }
      ]}
    >
      {children}
    </VStack>
  </VStack>
)

export default UnitListHeader
