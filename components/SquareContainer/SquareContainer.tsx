import { VStack } from '@gluestack-ui/themed'
import { type PropsWithChildren } from 'react'

const SquareContainer = ({ children }: PropsWithChildren) => (
  <VStack
    alignItems='center'
    bg='$secondary50'
    borderColor='$secondary700'
    borderRadius='$2xl'
    borderWidth='$2'
    justifyContent='center'
    h='$11'
    w='$11'
  >
    {children}
  </VStack>
)

export default SquareContainer
