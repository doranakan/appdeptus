import { type CodexName } from 'appdeptus/models'
import { LinearGradient } from 'expo-linear-gradient'
import { memo } from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import ArmyBackground from '../ArmyBackground'
import { selectThemeName } from '../store'
import { HStack, VStack, themeColors } from '../ui'

type VersusBackgroundProps = {
  codexOne: CodexName

  codexTwo?: CodexName
  player?: 'one' | 'two'
}

const VersusBackground = ({
  codexOne,
  codexTwo,
  player
}: VersusBackgroundProps) => {
  const themeName = useSelector(selectThemeName)
  return (
    <HStack className='absolute h-full w-full'>
      <VStack className='flex-1'>
        <ArmyBackground codex={codexOne} />
        <LinearGradient
          colors={[
            `${themeColors[themeName].primary[950]}00`,
            themeColors[themeName].primary[950]
          ]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />
      </VStack>
      <VStack className='flex-1'>
        {codexTwo ? <ArmyBackground codex={codexTwo} /> : null}
        <LinearGradient
          colors={[
            themeColors[themeName].primary[950],
            `${themeColors[themeName].primary[950]}00`
          ]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />
      </VStack>
      <LinearGradient
        colors={[
          `${themeColors[player === 'one' ? codexOne : (codexTwo ?? 'default')].primary[950]}00`,
          themeColors[player === 'one' ? codexOne : (codexTwo ?? 'default')]
            .primary[950]
        ]}
        style={styles.bottomGradient}
      />
    </HStack>
  )
}

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  bottomGradient: {
    bottom: 0,
    height: '10%',
    position: 'absolute',
    width: '100%'
  }
})

export default memo(VersusBackground)
