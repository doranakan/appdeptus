import dedicatedServer from 'appdeptus/assets/lotties/dedicated-server.json'
import { Text, VStack } from 'appdeptus/components'
import LottieView from 'lottie-react-native'
import { memo } from 'react'

const Loading = () => (
  <VStack className='flex-1 items-center justify-center'>
    <LottieView
      autoPlay
      style={{
        width: 100,
        height: 100
      }}
      source={dedicatedServer}
      duration={1000}
    />
    <Text family='heading-regular'>loading...</Text>
  </VStack>
)

export default memo(Loading)
