import { ScreenContainer, Text, VStack } from 'appdeptus/components'
import CodexList from './CodexList'
import Header from './Header'

const CodexSelectionScreen = () => {
  return (
    <ScreenContainer safeAreaInsets={['top', 'bottom']}>
      <VStack
        className='flex-1 px-4 pb-0 pt-4'
        space='md'
      >
        <Header />
        <Text
          family='heading-regular'
          size='4xl'
        >
          new army
        </Text>
        <CodexList />
      </VStack>
    </ScreenContainer>
  )
}

export default CodexSelectionScreen
