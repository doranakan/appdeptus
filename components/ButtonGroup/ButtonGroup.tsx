import { type ComponentProps, type ReactElement } from 'react'
import type Button from '../Button'
import InnerBorder from '../InnerBorder'
import { HStack, VStack } from '../ui'

type ButtonGroupProps = {
  children: (ReactElement<ComponentProps<typeof Button>> | null)[]
}

const ButtonGroup = ({ children }: ButtonGroupProps) => (
  <VStack className='rounded-2xl bg-primary-950'>
    <InnerBorder
      rounded='rounded-2xl'
      opacity='opacity-30'
    >
      <HStack
        className='p-1'
        space='sm'
      >
        {children}
      </HStack>
    </InnerBorder>
  </VStack>
)

export default ButtonGroup
