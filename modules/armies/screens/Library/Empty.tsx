import toxicFree from 'appdeptus/assets/lotties/toxic-free.json'
import { Text, VStack } from 'appdeptus/components'
import LottieView from 'lottie-react-native'
import { memo } from 'react'

type EmptyProps = {
  variant: 'data' | 'search'
}

const Empty = ({ variant }: EmptyProps) => (
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
          {variantToText[variant].title}
        </Text>
        <Text className='text-center'>{variantToText[variant].subtitle}</Text>
      </VStack>
    </VStack>
  </VStack>
)

const variantToText = {
  data: {
    subtitle: 'You have no army!\nPress "+" to add your first.',
    title: 'Heresy!'
  },
  search: {
    subtitle: 'Your research leads to nothing!',
    title: 'Search error'
  }
} as const satisfies Record<
  EmptyProps['variant'],
  {
    subtitle: string
    title: string
  }
>

export default memo(Empty)
