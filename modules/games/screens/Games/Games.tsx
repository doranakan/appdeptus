import { ScreenContainer, ScreenTitle } from 'appdeptus/components'
import GameList from './GameList'
import Header from './Header'

const Games = () => {
  return (
    <ScreenContainer
      className='p-4'
      safeAreaInsets={['top']}
      space='md'
    >
      <Header />
      <ScreenTitle>games</ScreenTitle>
      <GameList />
    </ScreenContainer>
  )
}

export default Games
