import {
  HStack,
  Icon,
  ScreenSubtitle,
  ScreenTitle,
  Text,
  VStack
} from 'appdeptus/components'
import { type ArmyBuilder } from 'appdeptus/models'
import { Info } from 'lucide-react-native'
import { memo, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

type TopBarProps = {
  subtitle: string
  title: string
}

const TopBar = ({ subtitle, title }: TopBarProps) => {
  const { watch } = useFormContext<ArmyBuilder>()

  const detachment = watch('detachment')

  const units = watch('units')

  const points = useMemo(() => {
    const enhancementPoints =
      detachment?.enhancements.reduce(
        (acc, enhancement) => (acc += enhancement.points),
        0
      ) ?? 0

    const unitPoints = units.reduce(
      (total, unit) =>
        (total +=
          unit.tier.points +
          unit.upgrades.reduce((acc, upgrade) => (acc += upgrade.points), 0)),
      0
    )

    return enhancementPoints + unitPoints
  }, [detachment?.enhancements, units])

  return (
    <VStack space='md'>
      <ScreenTitle>{title}</ScreenTitle>
      <HStack className='justify-between'>
        <ScreenSubtitle>{subtitle}</ScreenSubtitle>
        <HStack
          className='items-center'
          space='md'
        >
          <Text
            className='uppercase'
            family='body-bold'
          >
            {`${points}pts`}
          </Text>
          <Icon
            as={Info}
            className='text-primary-50'
          />
        </HStack>
      </HStack>
    </VStack>
  )
}

export default memo(TopBar)
