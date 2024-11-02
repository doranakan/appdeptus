import { ScreenContainer, ScreenTitle, VStack } from 'appdeptus/components'
import { ArmyBuilderBackground } from '../../components'
import CodexList from './CodexList'
import Header from './Header'

const CodexSelectionScreen = () => (
  <ScreenContainer safeAreaInsets={['top', 'bottom']}>
    <ArmyBuilderBackground />
    <VStack
      className='flex-1 px-4 pb-0 pt-4'
      space='md'
    >
      <Header />
      <ScreenTitle>new army</ScreenTitle>
      <CodexList />
    </VStack>
  </ScreenContainer>
)

export default CodexSelectionScreen
