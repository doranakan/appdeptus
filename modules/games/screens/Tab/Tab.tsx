import { ScreenContainer, ScreenTitle } from 'appdeptus/components'
import GameList from './GameList'

const GamesTab = () => (
  <ScreenContainer
    className='px-4'
    space='md'
  >
    <ScreenTitle>games</ScreenTitle>
    <GameList />
  </ScreenContainer>
)

export default GamesTab
