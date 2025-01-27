import { type CodexName } from 'appdeptus/models'
import { Image, type ImageProps } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { forwardRef, type ForwardRefRenderFunction, memo } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { themeColors, VStack } from '../ui'
import { blurhash, codexNameToImgSrcMap } from '../constants'
import Animated, {
  useAnimatedStyle,
  type SharedValue
} from 'react-native-reanimated'

type ArmyBackgroundProps = {
  codex: CodexName
  onImageDisplay?: ImageProps['onDisplay']
  gradientOpacity?: SharedValue<number>
}

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient)

const ArmyBackground: ForwardRefRenderFunction<Image, ArmyBackgroundProps> = (
  { codex, onImageDisplay, gradientOpacity },
  ref
) => {
  const rGradient = useAnimatedStyle(() => ({
    opacity: gradientOpacity?.value ?? 0.8
  }))
  return (
    <VStack className='absolute h-full w-full'>
      <Image
        onDisplay={onImageDisplay}
        source={codexNameToImgSrcMap[codex]}
        collapsable={false}
        ref={ref}
        style={styles.image}
        placeholder={
          Platform.OS === 'ios'
            ? {
                blurhash: blurhash[codex],
                isAnimated: true,
                cacheKey: codexNameToImgSrcMap
              }
            : undefined
        }
        cachePolicy='memory-disk'
      />

      <AnimatedGradient
        colors={[
          themeColors[codex].primary[800],
          themeColors[codex].tertiary[800]
        ]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradient, rGradient]}
      />
    </VStack>
  )
}

const styles = StyleSheet.create({
  gradient: { width: '100%', height: '100%' },
  image: { position: 'absolute', width: '100%', height: '100%', flex: 1 }
})

export default memo(forwardRef(ArmyBackground))
