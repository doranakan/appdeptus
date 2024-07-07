import { type CodexName } from 'appdeptus/models'
import { StatusBar } from 'expo-status-bar'
import AnimatedBackgroundImage from '../AnimatedBackgroundImage'
import mapCodexNameToBackground from './mapCodexNameToBackground'
import mapHeroNameToBackground from './mapHeroNameToBackground'

type AnimatedArmyBackgroundImageProps = {
  codexName: CodexName
  type: 'codex' | 'hero'
  opacity?: number
  duration?: number
  exitScale?: number
  fromScale?: number
}

const backgrounds = {
  codex: mapCodexNameToBackground,
  hero: mapHeroNameToBackground
} as const

const AnimatedArmyBackgroundImage = ({
  codexName,
  type,
  ...props
}: AnimatedArmyBackgroundImageProps) => (
  <>
    <StatusBar
      animated
      style='light'
    />
    <AnimatedBackgroundImage
      source={backgrounds[type][codexName]}
      {...props}
    />
  </>
)

export default AnimatedArmyBackgroundImage
