import { LinearGradient, VStack } from '@gluestack-ui/themed'
import { AnimatedArmyBackgroundImage } from 'appdeptus/components'
import { config, useColorMode } from 'appdeptus/designSystem'
import { type Army } from 'appdeptus/models'
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient'
import { MotiView } from 'moti'

type ArmyCoverImageProps = {
  army: Army
}

const ArmyCoverImage = ({ army }: ArmyCoverImageProps) => {
  const colorMode = useColorMode()
  return (
    <VStack
      h='$full'
      position='absolute'
      width='$full'
    >
      <AnimatedArmyBackgroundImage
        codexName={army.codex.name}
        duration={200}
        fromScale={1.1}
        opacity={0.3}
      />
      <VStack
        h='$full'
        position='absolute'
        w='$full'
      >
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 300 }}
        >
          <LinearGradient
            colors={[
              'rgba(0,0,0,0.2)',
              colorMode === 'light'
                ? config.tokens.colors.secondary700
                : config.themes[colorMode].colors.secondary700
            ]}
            start={0}
            end={1}
            as={ExpoLinearGradient}
            style={{
              height: '100%',
              width: '100%'
            }}
          />
        </MotiView>
      </VStack>
    </VStack>
  )
}

export default ArmyCoverImage