import { ScreenContainer, VStack } from 'appdeptus/components'
import CodexList from './CodexList'

const CodexSelectionScreen = () => (
  <ScreenContainer
    safeAreaInsets={['bottom']}
    hideBottomGradient
  >
    <VStack
      className='flex-1 py-4'
      space='md'
    >
      <CodexList />
    </VStack>
  </ScreenContainer>
)

export default CodexSelectionScreen
