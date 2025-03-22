import { Text, VStack } from 'appdeptus/components'
import Animated, { FadeIn } from 'react-native-reanimated'

const Text6 = () => (
  <Animated.View entering={FadeIn.delay(400)}>
    <VStack space='md'>
      <Text
        family='heading-regular'
        size='3xl'
      >
        Get ready
      </Text>

      <Text>Customize your profile and start.</Text>
    </VStack>
  </Animated.View>
)

export default Text6
