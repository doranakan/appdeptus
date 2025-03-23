import { VersusBackground, VStack } from 'appdeptus/components'
import { type ComponentProps } from 'react'

type GameBackgroundProps = Omit<
  ComponentProps<typeof VersusBackground>,
  'variant'
>

const GameBackground = (props: GameBackgroundProps) => (
  <VStack className='absolute h-full w-full'>
    <VStack className='flex-1'>
      <VersusBackground
        {...props}
        variant='full-art'
        bottomGradient
      />
    </VStack>
    <VStack className='flex-1' />
  </VStack>
)

export default GameBackground
