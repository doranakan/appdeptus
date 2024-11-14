import { ScreenContainer, ScreenTitle } from 'appdeptus/components'
import ArmyList from './ArmyList'
import Header from './Header'

const ArmiesTab = () => (
  <ScreenContainer
    className='p-4'
    safeAreaInsets={['top']}
    space='md'
  >
    <Header />
    <ScreenTitle>army library</ScreenTitle>
    <ArmyList />
  </ScreenContainer>
)

export default ArmiesTab
