import { defaultScreenOptions } from 'appdeptus/constants'
import { Stack } from 'expo-router'

const OnboardingLayout = () => (
  <Stack
    initialRouteName='index'
    screenOptions={{ ...defaultScreenOptions, animationTypeForReplace: 'pop' }}
  >
    <Stack.Screen name='index' />
  </Stack>
)

export default OnboardingLayout
