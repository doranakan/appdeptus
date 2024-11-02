import danger from 'appdeptus/assets/lotties/danger.json'

import LottieView from 'lottie-react-native'
import Text from '../Text'
import { VStack } from '../ui'

const Error = () => (
  <VStack className='flex-1 items-center justify-center'>
    <LottieView
      autoPlay
      style={{
        width: 100,
        height: 100
      }}
      source={danger}
    />
    <VStack>
      <Text
        className='text-center'
        family='heading-regular'
        size='2xl'
      >
        Astropathic Miscommunication!
      </Text>
      <Text className='text-center'>
        You may want to pull to retry a new one!
      </Text>
    </VStack>
  </VStack>
)

export default Error
