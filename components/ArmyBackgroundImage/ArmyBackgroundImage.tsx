import { type CodexName } from 'appdeptus/models'
import BackgroundImage from '../BackgroundImage'
import mapCodexNameToBackground from './mapCodexNameToBackground'

type ArmyBackgroundImageProps = {
  codexName: CodexName
  opacity?: number
}

const ArmyBackgroundImage = ({
  codexName,
  ...props
}: ArmyBackgroundImageProps) => (
  <BackgroundImage
    source={mapCodexNameToBackground[codexName]}
    {...props}
  />
)

export default ArmyBackgroundImage
