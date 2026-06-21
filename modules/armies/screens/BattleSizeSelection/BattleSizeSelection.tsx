import { ScreenContainer, VStack } from 'appdeptus/components'
import { ArmyBuilderBackground } from '../../components'
import BattleSizeList from './BattleSizeList'

const BattleSizeSelection = () => (
  <ScreenContainer
    safeAreaInsets={['bottom']}
    hideBottomGradient
  >
    <ArmyBuilderBackground />
    <VStack
      className='flex-1 px-4 py-4'
      space='md'
    >
      <BattleSizeList />
    </VStack>
  </ScreenContainer>
)

export default BattleSizeSelection
