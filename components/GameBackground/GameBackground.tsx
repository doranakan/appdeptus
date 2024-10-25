import { type CodexName } from 'appdeptus/models'
import { LinearGradient } from 'expo-linear-gradient'
import { useSelector } from 'react-redux'
import ArmyBackground from '../ArmyBackground'
import { selectThemeName } from '../store'
import { HStack, themeColors, VStack } from '../ui'

type GameBackgroundProps = {
  codexOne?: CodexName
  codexTwo?: CodexName
}

const GameBackground = ({ codexOne, codexTwo }: GameBackgroundProps) => {
  const themeName = useSelector(selectThemeName)
  return (
    <HStack className='absolute h-full w-full'>
      <VStack className='flex-1'>
        {codexOne ? <ArmyBackground codex={codexOne} /> : undefined}
        <LinearGradient
          colors={[themeColors[themeName].primary[950], 'transparent']}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 1 }}
          style={{
            flex: 1
          }}
        />
      </VStack>
      <VStack className='flex-1'>
        {codexTwo ? <ArmyBackground codex={codexTwo} /> : undefined}
        <LinearGradient
          colors={[themeColors[themeName].primary[950], 'transparent']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={{
            flex: 1
          }}
        />
      </VStack>
    </HStack>
  )
}

export default GameBackground
