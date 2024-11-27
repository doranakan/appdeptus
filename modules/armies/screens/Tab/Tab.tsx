import { ScreenContainer, ScreenTitle } from 'appdeptus/components'
import ArmyList from './ArmyList'

const ArmiesTab = () => (
  <ScreenContainer
    className='px-4'
    space='md'
  >
    <ScreenTitle>army library</ScreenTitle>
    <ArmyList />
  </ScreenContainer>
)

export default ArmiesTab
