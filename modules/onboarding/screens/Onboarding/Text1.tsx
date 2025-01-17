import { Text, VStack } from 'appdeptus/components'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

const Text1 = () => (
  <Animated.View
    entering={FadeIn}
    exiting={FadeOut}
  >
    <VStack space='md'>
      <Text
        family='heading-regular'
        size='3xl'
      >
        Build your rosters
      </Text>

      <Text>Create armies with no limits.</Text>
    </VStack>
  </Animated.View>
)

export default Text1
