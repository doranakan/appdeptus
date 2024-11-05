import { withDelay, withTiming, Easing } from 'react-native-reanimated'

const CustomFadeIn = () => {
  'worklet'

  const animations = {
    opacity: withDelay(150, withTiming(1, { duration: 300 })),
    transform: [
      {
        scale: withDelay(
          150,
          withTiming(1, {
            easing: Easing.out(Easing.cubic),
            duration: 300
          })
        )
      }
    ]
  }

  const initialValues = {
    opacity: 0,
    transform: [{ scale: 0.9 }]
  }

  return { animations, initialValues }
}

const CustomFadeOut = () => {
  'worklet'

  const animations = {
    opacity: withTiming(0, { duration: 300 }),
    transform: [
      {
        scale: withTiming(0.9, {
          easing: Easing.out(Easing.cubic),
          duration: 300
        })
      }
    ]
  }

  const initialValues = {
    opacity: 1,
    transform: [{ scale: 1 }]
  }

  return { animations, initialValues }
}

export { CustomFadeIn, CustomFadeOut }
