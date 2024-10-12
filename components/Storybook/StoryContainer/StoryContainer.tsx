import { type PropsWithChildren } from 'react'
import { HStack, Text, VStack } from '../../'
import ThemeSelector from './ThemeSelector'

const StoryContainer = ({ children }: PropsWithChildren) => (
  <VStack
    className='flex-1 bg-primary-950 p-4'
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
    <VStack className='flex-1 items-center justify-center rounded-2xl bg-secondary-50'>
      {children}
    </VStack>
  </VStack>
)

export default StoryContainer
