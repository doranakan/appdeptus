import { LinearGradient, VStack, type HStack } from '@gluestack-ui/themed'
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient'
import { type PropsWithChildren } from 'react'

type CardProps = (typeof HStack)['defaultProps'] & {
  gradient?: 'primary' | 'secondary'
}

const Card = ({
  children,
  gradient = 'secondary',
  ...props
}: PropsWithChildren<CardProps>) => (
  <LinearGradient
    p={1}
    colors={[`$${gradient}200`, `$${gradient}400`, `$${gradient}100`]}
    start={0}
    end={1}
    as={ExpoLinearGradient}
  >
    <VStack
      bg='$secondary100'
      p='$2'
      {...props}
    >
      {children}
    </VStack>
  </LinearGradient>
)

export default Card
