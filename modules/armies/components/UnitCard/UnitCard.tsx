import { HStack } from 'appdeptus/components/ui/hstack'
import { Text } from 'appdeptus/components/ui/text'
import { VStack } from 'appdeptus/components/ui/vstack'
import { type PropsWithChildren } from 'react'

type UnitCardProps = {
  name: string
  points: number
  subtitle: string
}

const UnitCard = ({
  name,
  points,
  subtitle,

  children
}: PropsWithChildren<UnitCardProps>) => (
  <VStack className='bg-backgroundLight-100 rounded-2xl gap-2 p-2'>
    <VStack className='border-secondary-500 border-b-1 border-l-1 pb-1 pl-2'>
      <Text
        ellipsizeMode='tail'
        numberOfLines={1}
        className='max-w-full'
      >
        <Text bold>{name}</Text>
      </Text>

      <HStack className='gap-1 justify-between'>
        <Text>{subtitle}</Text>
        <Text
          textTransform='uppercase'
          className='font-heading'
        >
          {points} pts
        </Text>
      </HStack>
    </VStack>
    {children}
  </VStack>
)

export default UnitCard
