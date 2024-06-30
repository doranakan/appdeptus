import { HStack, Heading, Text, VStack } from '@gluestack-ui/themed'
import { Card } from 'appdeptus/components'
import { type ComponentProps, type PropsWithChildren } from 'react'

type UnitCardProps = ComponentProps<typeof Card> & {
  name: string
  points: number
  subtitle: string

  caption?: string
}

const UnitCard = ({
  name,
  points,
  subtitle,

  caption,
  children,
  ...cardProps
}: PropsWithChildren<UnitCardProps>) => (
  <Card
    gap='$2'
    {...cardProps}
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
        <Heading>{name}</Heading>
        {caption && <Text fontSize='$sm'>{` ${caption}`}</Text>}
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
  </Card>
)

export default UnitCard
