import { LinearGradient } from 'expo-linear-gradient'
import { memo, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import InnerBorder from '../InnerBorder'
import { selectThemeName } from '../store'
import Text from '../Text'
import { themeColors } from '../ui'

type ProgressProps = {
  currentStep: number
  steps: number
  text: string
}

const Progress = ({ currentStep, steps, text }: ProgressProps) => {
  const themeName = useSelector(selectThemeName)

  const widthPercentage = useSharedValue(0)

  useEffect(() => {
    widthPercentage.value = (currentStep * 100) / steps
  }, [currentStep, steps, widthPercentage])

  const rStyle = useAnimatedStyle(() => ({
    width: withTiming(`${widthPercentage.value}%`)
  }))

  return (
    <View className='max-h-6 w-full flex-1'>
      <InnerBorder rounded='full'>
        <View className='h-full w-full items-center justify-center overflow-hidden rounded-full bg-primary-800'>
          <Text
            className='z-2 relative uppercase color-primary-50'
            size='sm'
          >
            {text}
          </Text>
          <Animated.View style={[styles.gradientWrapper, rStyle]}>
            <InnerBorder rounded='full'>
              <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                colors={[
                  themeColors[themeName].tertiary[950],
                  themeColors[themeName].tertiary[600]
                ]}
                style={styles.progress}
              />
            </InnerBorder>
          </Animated.View>
        </View>
      </InnerBorder>
    </View>
  )
}

const styles = StyleSheet.create({
  gradientWrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    zIndex: -1
  },
  progress: {
    height: '100%',
    width: '100%'
  }
})

export default memo(Progress)
