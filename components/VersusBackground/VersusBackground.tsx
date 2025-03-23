import { type CodexName } from 'appdeptus/models'
import { LinearGradient } from 'expo-linear-gradient'
import { memo } from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import ArmyAvatar from '../ArmyAvatar'
import ArmyBackground from '../ArmyBackground'
import { selectThemeName } from '../store'
import { HStack, VStack, themeColors } from '../ui'

type VersusBackgroundProps = {
  codexOne: CodexName
  codexTwo: CodexName
  variant: 'avatar' | 'full-art'

  bottomGradient?: boolean
}

const VersusBackground = ({
  codexOne,
  codexTwo,
  variant,
  bottomGradient
}: VersusBackgroundProps) => {
  const themeName = useSelector(selectThemeName)
  return (
    <HStack className='absolute h-full w-full'>
      <VStack className='flex-1'>
        {variant === 'avatar' ? (
          <ArmyAvatar codex={codexOne} />
        ) : (
          <ArmyBackground codex={codexOne} />
        )}
        <LinearGradient
          colors={[
            themeColors[themeName].primary[950],
            `${themeColors[codexOne].primary[950]}80`,
            `${themeColors[codexOne].primary[950]}00`
          ]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 1 }}
          style={{
            position: 'absolute',
            right: 0,
            width: '50%',
            height: '100%'
          }}
        />
        <LinearGradient
          colors={[
            themeColors[codexOne].primary[950],
            `${themeColors[codexOne].primary[950]}00`
          ]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: 'absolute',
            left: 0,
            width: '50%',
            height: '100%'
          }}
        />
      </VStack>
      <VStack className='flex-1'>
        {variant === 'avatar' ? (
          <ArmyAvatar codex={codexTwo} />
        ) : (
          <ArmyBackground codex={codexTwo} />
        )}
        <LinearGradient
          colors={[
            themeColors[themeName].primary[950],
            `${themeColors[codexTwo].primary[950]}80`,
            `${themeColors[codexTwo].primary[950]}00`
          ]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: 'absolute',
            left: 0,
            width: '50%',
            height: '100%'
          }}
        />
        <LinearGradient
          colors={[
            themeColors[codexTwo].primary[950],
            `${themeColors[codexTwo].primary[950]}00`
          ]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 1 }}
          style={{
            position: 'absolute',
            right: 0,
            width: '50%',
            height: '100%'
          }}
        />
      </VStack>
      {bottomGradient ? (
        <LinearGradient
          colors={[
            `${themeColors[themeName].primary[950]}00`,
            themeColors[themeName].primary[950]
          ]}
          style={styles.bottomGradient}
        />
      ) : null}
    </HStack>
  )
}

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    height: '100%',
    width: '30%'
  },
  bottomGradient: {
    bottom: 0,
    height: '25%',
    position: 'absolute',
    width: '100%'
  }
})

export default memo(VersusBackground)
