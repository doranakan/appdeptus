import danger from 'appdeptus/assets/lotties/danger.json'

import LottieView from 'lottie-react-native'
import { type ComponentProps } from 'react'
import Button from '../Button'
import Text from '../Text'
import { VStack } from '../ui'

type ErrorProps = {
  button?: ComponentProps<typeof Button>
  caption?: string
  description?: string
  title?: string
}

const Error = ({ button, caption, description, title }: ErrorProps) => (
  <VStack className='flex-1 items-center justify-center'>
    <LottieView
      autoPlay
      style={{
        width: 100,
        height: 100
      }}
      source={danger}
    />
    <VStack space='md'>
      <Text
        className='text-center'
        family='heading-regular'
        size='2xl'
      >
        {title ?? 'Astropathic Miscommunication!'}
      </Text>
      {caption ? (
        <Text
          className='text-center'
          family='body-bold'
          size='lg'
        >
          {caption}
        </Text>
      ) : null}
      <Text className='text-center'>
        {description ?? 'You may want to pull down to retry a new one!'}
      </Text>
      {button ? <Button {...button} /> : null}
    </VStack>
  </VStack>
)

export default Error
