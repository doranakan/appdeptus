import { ScreenContainer, Text } from 'appdeptus/components'
import { type EndedGame } from 'appdeptus/models/game'

type EndedViewScreenProps = {
  game: EndedGame
}

const EndedViewScreen = ({ game }: EndedViewScreenProps) => (
  <ScreenContainer className='items-center justify-center'>
    <Text>Ended Game - {game.id}</Text>
  </ScreenContainer>
)

export default EndedViewScreen
