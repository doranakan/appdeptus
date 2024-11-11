import toxicFree from 'appdeptus/assets/lotties/toxic-free.json'
import LottieView from 'lottie-react-native'
import { memo } from 'react'
import Text from '../Text'
import { VStack } from '../ui'

type EmptyProps = {
  subtitle: string
  title: string
}

const Empty = ({ subtitle, title }: EmptyProps) => (
  <VStack className='h-full w-full items-center justify-center'>
    <LottieView
      autoPlay
      style={{
        width: 100,
        height: 100
      }}
      source={toxicFree}
    />
    <VStack space='2xl'>
      <VStack>
        <Text
          className='text-center'
          family='heading-regular'
          size='2xl'
        >
          {title}
        </Text>
        <Text className='text-center'>{subtitle}</Text>
      </VStack>
    </VStack>
  </VStack>
)

export default memo(Empty)
