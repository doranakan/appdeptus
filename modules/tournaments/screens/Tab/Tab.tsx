import { ScreenContainer, ScreenTitle } from 'appdeptus/components'
import TournamentList from './TournamentList'

const TournamentsTab = () => (
  <ScreenContainer
    className='px-4'
    space='md'
  >
    <ScreenTitle>Tournaments</ScreenTitle>
    <TournamentList />
  </ScreenContainer>
)

export default TournamentsTab
