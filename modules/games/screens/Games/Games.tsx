import { VStack } from '@gluestack-ui/themed'
import { Header } from 'appdeptus/components'
import { Swords } from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Background from './Background'
import GameList from './GameList'

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
        <Header
          title='Games'
          right={{
            href: 'play/new',
            Icon: Swords
          }}
        />

        <GameList />
      </VStack>
    </VStack>
  )
}

export default GamesScreen
