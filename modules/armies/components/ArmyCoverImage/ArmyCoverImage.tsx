import {
  AnimatedArmyBackgroundImage,
  LinearGradient
} from 'appdeptus/components'
import { VStack } from 'appdeptus/components/ui/vstack'
import { config, useColorMode } from 'appdeptus/designSystem'
import { type CodexName } from 'appdeptus/models'
import { MotiView } from 'moti'

type ArmyCoverImageProps = {
  codexName: CodexName
}

const ArmyCoverImage = ({ codexName }: ArmyCoverImageProps) => {
  const colorMode = useColorMode()
  return (
    <VStack className='h-full absolute w-full'>
      <AnimatedArmyBackgroundImage
        codexName={codexName}
        duration={200}
        fromScale={1.1}
        opacity={0.3}
      />
      <VStack className='h-full absolute w-full'>
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
          />
        </MotiView>
      </VStack>
    </VStack>
  )
}

export default ArmyCoverImage
