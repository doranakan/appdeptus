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
    borderRadius='$2xl'
    borderWidth='$2'
    justifyContent='center'
    h={size}
    w={size}
  >
    {children}
  </VStack>
)

export default SquareContainer
