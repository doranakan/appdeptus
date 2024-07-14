import { Box, HStack, VStack } from '@gluestack-ui/themed'
import {
  AnimatedArmyBackgroundImage,
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
        <AnimatedArmyBackgroundImage
          codexName={codexOne}
          type='hero'
        />
      ) : undefined}
      <LinearGradient
        colors={['$secondary900', '$transparent']}
        position='absolute'
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 1 }}
      />
    </VStack>
    <VStack
      bg='$secondary950'
      flex={1}
    >
      {codexTwo ? (
        <AnimatedArmyBackgroundImage
          codexName={codexTwo}
          type='hero'
        />
      ) : undefined}
      <LinearGradient
        colors={['$secondary900', '$transparent']}
        position='absolute'
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
      />
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
