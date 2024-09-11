import { Header } from 'appdeptus/components'
import { VStack } from 'appdeptus/components/ui/vstack'
import { Swords } from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Background from './Background'
import GameList from './GameList'

const GamesScreen = () => {
  const insets = useSafeAreaInsets()

  return (
    <VStack className='flex-1'>
      <Background />
      <VStack className={` pt-${insets.top} flex-1 gap-4 px-4 `}>
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
