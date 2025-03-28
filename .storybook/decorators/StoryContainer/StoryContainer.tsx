import { HStack, Text, VStack } from 'appdeptus/components'
import ThemeSelector from './ThemeSelector'

const StoryContainer = (Story: () => JSX.Element) => (
  <VStack
    className='flex-1 bg-secondary-950 p-4'
    space='md'
  >
    <HStack className='w-full justify-center'>
      <Text
        className='text-center uppercase color-primary-50'
        family='heading-regular'
        size='lg'
      >
        appdeptus
      </Text>
    </HStack>
    <ThemeSelector />
    <VStack className='flex-1 items-center justify-center rounded-2xl bg-primary-950 p-4'>
      <Story />
    </VStack>
  </VStack>
)

export default StoryContainer
