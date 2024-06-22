import { type CodexName } from 'appdeptus/models'
import BackgroundImage from '../BackgroundImage'
import mapCodexNameToBackground from './mapCodexNameToBackground'

type ArmyBackgroundImageProps = {
  codexName: CodexName
}

const ArmyBackgroundImage = ({ codexName }: ArmyBackgroundImageProps) => (
  <BackgroundImage source={mapCodexNameToBackground[codexName]} />
)

export default ArmyBackgroundImage
