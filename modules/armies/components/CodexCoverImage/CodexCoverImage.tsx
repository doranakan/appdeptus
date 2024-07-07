import { Box } from '@gluestack-ui/themed'
import {
  AnimatedArmyBackgroundImage,
  ArmyBackgroundImage,
  LinearGradient
} from 'appdeptus/components'
import { type CodexName } from 'appdeptus/models'

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
        type='codex'
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
      <LinearGradient colors={['$white', 'rgba(255,255,255,0)']} />
    </Box>
  </>
)

export default CodexCoverImage
