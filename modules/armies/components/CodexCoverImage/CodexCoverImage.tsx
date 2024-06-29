import { Box, LinearGradient } from '@gluestack-ui/themed'
import {
  AnimatedArmyBackgroundImage,
  ArmyBackgroundImage
} from 'appdeptus/components'
import { type CodexName } from 'appdeptus/models'
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient'

type CodexCoverImageProps = {
  codexName: CodexName

  animated?: boolean
}

const CodexCoverImage = ({ codexName, animated }: CodexCoverImageProps) => (
  <>
    {animated ? (
      <AnimatedArmyBackgroundImage
        codexName={codexName}
        opacity={0.2}
        duration={200}
        fromScale={1.1}
        exitScale={1.5}
      />
    ) : (
      <ArmyBackgroundImage
        codexName={codexName}
        opacity={0.2}
      />
    )}
    <Box
      h='$full'
      position='absolute'
      w='$full'
    >
      <LinearGradient
        colors={['$white', 'rgba(255,255,255,0)']}
        start={0}
        end={1}
        as={ExpoLinearGradient}
        style={{
          height: '100%',
          width: '100%'
        }}
      />
    </Box>
  </>
)

export default CodexCoverImage
