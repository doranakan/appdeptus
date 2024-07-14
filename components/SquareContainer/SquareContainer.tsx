import { VStack } from '@gluestack-ui/themed'
import { type ComponentProps, type PropsWithChildren } from 'react'

type SquareContainerProps = {
  bg?: ComponentProps<typeof VStack>['bg']
  borderColor?: ComponentProps<typeof VStack>['borderColor']
  size?: ComponentProps<typeof VStack>['h']
}

const SquareContainer = ({
  bg = '$secondary50',
  borderColor = '$secondary700',
  children,
  size = '$11'
}: PropsWithChildren<SquareContainerProps>) => (
  <VStack
    alignItems='center'
    bg={bg}
    borderColor={borderColor}
    borderWidth='$1'
    justifyContent='center'
    h={size}
    w={size}
    transform={[
      {
        rotate: '45 deg'
      }
    ]}
  >
    <VStack
      alignItems='center'
      justifyContent='center'
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
