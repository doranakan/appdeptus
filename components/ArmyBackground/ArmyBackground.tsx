import { type CodexName } from 'appdeptus/models'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { memo } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { themeColors, VStack } from '../ui'
import Animated, {
  type SharedValue,
  useAnimatedStyle
} from 'react-native-reanimated'
import {
  armyBackgroundBlurHash,
  armyBackgroundSource
} from 'appdeptus/modules/armies/constants'
type ArmyBackgroundProps = {
  codex: CodexName
  animatedOpacity?: SharedValue<number>
  animatedScale?: SharedValue<number>
}
const ArmyBackground = ({
  animatedOpacity,
  animatedScale,
  codex
}: ArmyBackgroundProps) => {
  const rOpacity = useAnimatedStyle(() => ({
    opacity: animatedOpacity ? animatedOpacity.value : 1
  }))
  const rScale = useAnimatedStyle(() => ({
    transform: [{ scale: animatedScale ? animatedScale.value : 1 }]
  }))
  return (
    <VStack className='absolute h-full w-full'>
      <Animated.View
        className='absolute h-full w-full'
        style={rScale}
      >
        <Image
          source={armyBackgroundSource[codex]}
          style={styles.image}
          placeholder={
            Platform.OS === 'ios'
              ? {
                  blurhash: armyBackgroundBlurHash[codex],
                  isAnimated: true,
                  cacheKey: armyBackgroundSource
                }
              : undefined
          }
          cachePolicy='memory-disk'
          transition={200}
        />
      </Animated.View>

      <Animated.View style={rOpacity}>
        <LinearGradient
          colors={[
            themeColors[codex].primary[800],
            themeColors[codex].tertiary[800]
          ]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        />
      </Animated.View>
    </VStack>
  )
}

const styles = StyleSheet.create({
  gradient: { width: '100%', height: '100%', opacity: 0.8 },
  image: { width: '100%', height: '100%', flex: 1 }
})

export default memo(ArmyBackground)
