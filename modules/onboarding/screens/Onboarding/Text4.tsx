import { Text, VStack } from 'appdeptus/components'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

const Text4 = () => (
  <Animated.View
    entering={FadeIn}
    exiting={FadeOut}
  >
    <VStack space='md'>
      <Text
        family='heading-regular'
        size='3xl'
      >
        Game history
      </Text>

      <Text>Browse and review all your games.</Text>
    </VStack>
  </Animated.View>
)

export default Text4
