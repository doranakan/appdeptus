import { type CodexName } from 'appdeptus/models'
import { StatusBar } from 'expo-status-bar'
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
  <>
    <StatusBar style='light' />
    <BackgroundImage
      source={mapCodexNameToBackground[codexName]}
      {...props}
    />
  </>
)

export default ArmyBackgroundImage
