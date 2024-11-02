import { ScreenContainer, Text } from 'appdeptus/components'
import ArmyList from './ArmyList'
import Header from './Header'

const ArmyLibraryScreen = () => (
  <ScreenContainer
    className='p-4'
    safeAreaInsets={['top']}
    space='md'
  >
    <Header />
    <Text
      family='heading-regular'
      size='4xl'
    >
      army library
    </Text>
    <ArmyList />
  </ScreenContainer>
)

export default ArmyLibraryScreen
