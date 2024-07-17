import {
  AnimatedArmyBackgroundImage,
  ArmyBackgroundImage
} from 'appdeptus/components'
import { type CodexName } from 'appdeptus/models'

type CodexCoverImageProps = {
  codexName: CodexName

  animated?: boolean
  opacity?: number
}

const CodexCoverImage = ({
  codexName,
  animated,
  opacity = 0.2
}: CodexCoverImageProps) => (
  <>
    {animated ? (
      <AnimatedArmyBackgroundImage
        codexName={codexName}
        opacity={opacity}
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
  </>
)

export default CodexCoverImage
