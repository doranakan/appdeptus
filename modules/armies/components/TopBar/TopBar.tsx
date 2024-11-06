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
import { useWatch } from 'react-hook-form'

type TopBarProps = {
  subtitle: string
  title: string
}

const TopBar = ({ subtitle, title }: TopBarProps) => {
  const watch = useWatch<ArmyBuilder>()

  const points = useMemo(() => {
    const enhancements =
      watch.detachment?.enhancements?.reduce(
        (acc, enhancement) => (acc += enhancement.points ?? 0),
        0
      ) ?? 0

    const units =
      watch.units?.reduce((acc, unit) => (acc += unit.tier?.points ?? 0), 0) ??
      0

    return enhancements + units
  }, [watch])

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
