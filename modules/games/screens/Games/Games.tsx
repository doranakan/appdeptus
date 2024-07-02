import { VStack } from '@gluestack-ui/themed'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Background from './Background'
import GameList from './GameList'
import Header from './Header'

const GamesScreen = () => {
  const insets = useSafeAreaInsets()

  return (
    <VStack flex={1}>
      <Background />

      <VStack
        flex={1}
        gap='$4'
        pt={insets.top}
        px='$4'
      >
        <Header />

        <GameList />
      </VStack>
    </VStack>
  )
}

export default GamesScreen
