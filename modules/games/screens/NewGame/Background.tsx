import { Box, HStack, VStack } from '@gluestack-ui/themed'
import {
  AnimatedArmyBackgroundImage,
  LinearGradient
} from 'appdeptus/components'
import { type CodexName } from 'appdeptus/models'

type BackgroundProps = {
  codex?: CodexName
}

const Background = ({ codex }: BackgroundProps) => (
  <HStack
    h='$full'
    position='absolute'
    w='$full'
  >
    <VStack
      bg='$secondary950'
      flex={1}
    >
      {codex ? (
        <AnimatedArmyBackgroundImage
          codexName={codex}
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
      <Box flex={3} />
      <Box flex={1}>
        <LinearGradient colors={['$transparent', '$secondary200']} />
      </Box>
    </VStack>
  </HStack>
)

export default Background
