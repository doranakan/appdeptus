import { VStack } from '@gluestack-ui/themed'
import { type PropsWithChildren } from 'react'

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

export default SquareContainer
