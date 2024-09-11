import { HStack, Text, VStack } from '@gluestack-ui/themed'
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
  <VStack
    bg='$backgroundLight100'
    borderRadius='$2xl'
    gap='$2'
    p='$2'
  >
    <VStack
      borderColor='$secondary500'
      borderBottomWidth='$1'
      borderLeftWidth='$1'
      pb='$1'
      pl='$2'
    >
      <Text
        ellipsizeMode='tail'
        maxWidth='$full'
        numberOfLines={1}
      >
        <Text bold>{name}</Text>
      </Text>

      <HStack
        gap='$1'
        justifyContent='space-between'
      >
        <Text>{subtitle}</Text>
        <Text
          fontFamily='$heading'
          textTransform='uppercase'
        >
          {points} pts
        </Text>
      </HStack>
    </VStack>
    {children}
  </VStack>
)

export default UnitCard
