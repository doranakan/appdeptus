import { type CodexName } from 'appdeptus/models'
import AnimatedBackgroundImage from '../AnimatedBackgroundImage'
import mapCodexNameToBackground from './mapCodexNameToBackground'

type ArmyBackgroundImageProps = {
  codexName: CodexName
  opacity?: number
}

const ArmyBackgroundImage = ({
  codexName,
  opacity
}: ArmyBackgroundImageProps) => (
  <AnimatedBackgroundImage
    source={mapCodexNameToBackground[codexName]}
    opacity={opacity}
  />
)

export default ArmyBackgroundImage
