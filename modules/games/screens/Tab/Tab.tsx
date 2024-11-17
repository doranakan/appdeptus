import { ScreenContainer, ScreenTitle, VStack } from 'appdeptus/components'
import { useGetGameQuery } from '../../api'
import ActiveGameTopBar from './ActiveGameTopBar'
import GameList from './GameList'
import Header from './Header'

const GamesTab = () => {
  const { data } = useGetGameQuery()

  return (
    <VStack className='flex-1'>
      <ActiveGameTopBar />
      <ScreenContainer
        className='p-4'
        safeAreaInsets={!data ? ['top'] : undefined}
        space='md'
      >
        <Header />
        <ScreenTitle>games</ScreenTitle>
        <GameList />
      </ScreenContainer>
    </VStack>
  )
}

export default GamesTab
