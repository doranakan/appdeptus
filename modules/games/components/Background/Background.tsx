import { Box, HStack, VStack } from '@gluestack-ui/themed'
import {
  AnimatedArmyBackgroundImage,
  AnimatedArmyIcon,
  LinearGradient
} from 'appdeptus/components'
import { type CodexName } from 'appdeptus/models'

type BackgroundProps = {
  codexOne: CodexName | undefined

  codexTwo?: CodexName
  opacity?: number
}

const Background = ({ codexOne, codexTwo, opacity = 1 }: BackgroundProps) => (
  <HStack
    h='$full'
    opacity={opacity}
    position='absolute'
    w='$full'
  >
    <VStack
      bg='$secondary950'
      flex={1}
    >
      {codexOne ? (
        <VStack flex={1}>
          <AnimatedArmyBackgroundImage
            codexName={codexOne}
            opacity={0.5}
          />
          <VStack
            h='$2/3'
            position='absolute'
            w='$full'
          >
            <AnimatedArmyIcon codexName={codexOne} />
          </VStack>
        </VStack>
      ) : undefined}
    </VStack>
    <VStack
      bg='$secondary950'
      flex={1}
    >
      {codexTwo ? (
        <VStack>
          <AnimatedArmyBackgroundImage
            codexName={codexTwo}
            opacity={0.5}
          />
          <VStack
            h='$2/3'
            position='absolute'
            w='$full'
          >
            <AnimatedArmyIcon codexName={codexTwo} />
          </VStack>
        </VStack>
      ) : undefined}
    </VStack>
    <VStack
      h='$full'
      opacity={0.4}
      position='absolute'
      w='$full'
    >
      <Box flex={2} />
      <Box flex={1}>
        <LinearGradient colors={['$transparent', '$secondary900']} />
      </Box>
    </VStack>
  </HStack>
)

export default Background
