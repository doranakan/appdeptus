import { type CodexName } from 'appdeptus/models'
import BackgroundImage from '../BackgroundImage'
import mapCodexNameToBackground from './mapCodexNameToBackground'

type ArmyBackgroundImageProps = {
  codexName: CodexName
  opacity?: number
}

const ArmyBackgroundImage = ({
  codexName,
  opacity
}: ArmyBackgroundImageProps) => (
  <BackgroundImage
    source={mapCodexNameToBackground[codexName]}
    opacity={opacity}
  />
)

export default ArmyBackgroundImage
