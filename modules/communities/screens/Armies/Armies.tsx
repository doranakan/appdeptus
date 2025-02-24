import { Text } from 'appdeptus/components'
import { CommunityScreenContainer } from '../../components'
import ArmyList from './ArmyList'

const ArmiesScreen = () => (
  <CommunityScreenContainer title='Armies'>
    <Text
      family='body-regular-italic'
      size='sm'
    >
      If you cannot find an army owned by a community member, they may need to
      mark it as visible to communities in their army detail screen.
    </Text>
    <ArmyList />
  </CommunityScreenContainer>
)

export default ArmiesScreen
