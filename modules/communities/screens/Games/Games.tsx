import { Text } from 'appdeptus/components'
import { CommunityScreenContainer } from '../../components'
import GameList from './GameList'

const GamesScreen = () => (
  <CommunityScreenContainer title='Games'>
    <Text
      family='body-regular-italic'
      size='sm'
    >
      Here are listed all the past games playeb by the community member against
      each others.
    </Text>
    <GameList />
  </CommunityScreenContainer>
)

export default GamesScreen
