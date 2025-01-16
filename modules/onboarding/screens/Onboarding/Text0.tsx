import { Text, VStack } from 'appdeptus/components'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

const Text0 = () => (
  <Animated.View exiting={FadeOut}>
    <VStack space='md'>
      <Animated.View entering={FadeIn.delay(500)}>
        <Text
          className='text-center'
          family='heading-regular'
          size='lg'
        >
          Welcome to
        </Text>
      </Animated.View>
      <Animated.View entering={FadeIn.delay(800)}>
        <Text
          className='text-center'
          family='heading-regular'
          size='5xl'
        >
          Appdeptus
        </Text>
      </Animated.View>
      <Animated.View entering={FadeIn.delay(1400)}>
        <Text className='text-center'>A Warhammer 40.000 Companion App</Text>
      </Animated.View>
    </VStack>
  </Animated.View>
)

export default Text0
