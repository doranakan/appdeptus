import { type CodexName } from 'appdeptus/models'
import { StatusBar } from 'expo-status-bar'
import AnimatedBackgroundImage from '../AnimatedBackgroundImage'
import mapCodexNameToBackground from './mapCodexNameToBackground'

type AnimatedArmyBackgroundImageProps = {
  codexName: CodexName
  opacity?: number
  duration?: number
  exitScale?: number
  fromScale?: number
}

const AnimatedArmyBackgroundImage = ({
  codexName,
  ...props
}: AnimatedArmyBackgroundImageProps) => (
  <>
    <StatusBar
      animated
      style='light'
    />
    <AnimatedBackgroundImage
      source={mapCodexNameToBackground[codexName]}
      {...props}
    />
  </>
)

export default AnimatedArmyBackgroundImage
