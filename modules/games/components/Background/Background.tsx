import {
  AnimatedArmyBackgroundImage,
  AnimatedArmyIcon,
  LinearGradient
} from 'appdeptus/components'
import { Box } from 'appdeptus/components/ui/box'
import { HStack } from 'appdeptus/components/ui/hstack'
import { VStack } from 'appdeptus/components/ui/vstack'
import { type CodexName } from 'appdeptus/models'

type BackgroundProps = {
  codexOne: CodexName | undefined

  codexTwo?: CodexName
  opacity?: number
}

const Background = ({ codexOne, codexTwo, opacity = 1 }: BackgroundProps) => (
  <HStack className={` opacity-${opacity} h-full absolute w-full `}>
    <VStack className='bg-secondary-950 flex-1'>
      {codexOne ? (
        <VStack className='flex-1'>
          <AnimatedArmyBackgroundImage
            codexName={codexOne}
            opacity={0.5}
          />
          <VStack className='h-2/3 absolute w-full'>
            <AnimatedArmyIcon codexName={codexOne} />
          </VStack>
        </VStack>
      ) : undefined}
    </VStack>
    <VStack className='bg-secondary-950 flex-1'>
      {codexTwo ? (
        <VStack>
          <AnimatedArmyBackgroundImage
            codexName={codexTwo}
            opacity={0.5}
          />
          <VStack className='h-2/3 absolute w-full'>
            <AnimatedArmyIcon codexName={codexTwo} />
          </VStack>
        </VStack>
      ) : undefined}
    </VStack>
    <VStack className='h-full opacity-40 absolute w-full'>
      <Box className='flex-2' />
      <Box className='flex-1'>
        <LinearGradient colors={['$transparent', '$secondary900']} />
      </Box>
    </VStack>
  </HStack>
)

export default Background
