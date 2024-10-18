import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'
import Text from '../Text'
import { StyleSheet, View } from 'react-native'
import { LinearGradient } from '../ui'
import InnerBorder from '../InnerBorder'
import { useEffect } from 'react'

type ProgressProps = {
  currentStep: number
  steps: number
  text: string
}

const Progress = ({ currentStep, steps, text }: ProgressProps) => {
  const widthPercentage = useSharedValue(0)

  useEffect(() => {
    widthPercentage.value = (currentStep * 100) / steps
  }, [currentStep, steps, widthPercentage])

  const rStyle = useAnimatedStyle(() => ({
    width: withSpring(`${widthPercentage.value}%`, {
      stiffness: 120,
      damping: 19
    })
  }))

  return (
    <View className='h-4 w-full'>
      <InnerBorder className='rounded-full'>
        <View className='h-full w-full items-center justify-center overflow-hidden rounded-full bg-primary-800'>
          <Text className='z-2 relative text-xs uppercase color-primary-50'>
            {text}
          </Text>
          <Animated.View style={[styles.gradientWrapper, rStyle]}>
            <InnerBorder className='rounded-l-full'>
              <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                from='bg-tertiary-950'
                to='bg-tertiary-600'
                className='h-full w-full'
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
  }
})

export default Progress
