import { HStack, Icon, Text } from 'appdeptus/components'
import { ChevronRightCircle } from 'lucide-react-native'
import { memo } from 'react'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

const Content0 = () => (
  <Animated.View
    className='flex-1'
    entering={FadeIn.delay(4000)}
    exiting={FadeOut}
  >
    <HStack
      className='items-center justify-center pb-4'
      space='md'
    >
      <Text>Tap the top right button to start</Text>
      <Icon
        as={ChevronRightCircle}
        className='text-tertiary-600'
      />
    </HStack>
  </Animated.View>
)

export default memo(Content0)
