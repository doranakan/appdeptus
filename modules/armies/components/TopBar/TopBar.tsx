import {
  HStack,
  Icon,
  ScreenSubtitle,
  ScreenTitle,
  Text,
  VStack
} from 'appdeptus/components'
import { type Army } from 'appdeptus/models'
import { Info } from 'lucide-react-native'
import { memo } from 'react'
import { useFormContext } from 'react-hook-form'

type TopBarProps = {
  subtitle: string
  title: string
}

const TopBar = ({ subtitle, title }: TopBarProps) => {
  const { watch } = useFormContext<Army>()

  const points = watch('points')

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
