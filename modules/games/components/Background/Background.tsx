import { VersusBackground, VStack } from 'appdeptus/components'
import { type ComponentProps } from 'react'

type GameBackgroundProps = ComponentProps<typeof VersusBackground>

const GameBackground = (props: GameBackgroundProps) => (
  <VStack className='absolute h-full w-full'>
    <VStack className='flex-1'>
      <VersusBackground
        {...props}
        bottomGradient
      />
    </VStack>
    <VStack className='flex-1' />
  </VStack>
)

export default GameBackground
