import { VStack, type HStack } from '@gluestack-ui/themed'
import { type PropsWithChildren } from 'react'

type CardProps = (typeof HStack)['defaultProps']

const Card = ({ children, ...props }: PropsWithChildren<CardProps>) => (
  <VStack
    backgroundColor='$secondary100'
    borderColor='$secondary200'
    borderWidth='$1'
    p='$2'
    {...props}
  >
    {children}
  </VStack>
)

export default Card
