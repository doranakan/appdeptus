import {
  Badge,
  Card,
  HStack,
  PlayerTag,
  Scoreboard,
  VersusBackground,
  VStack
} from 'appdeptus/components'
import { type EndedGame } from 'appdeptus/models/game'
import { formatDistanceToNow } from 'date-fns'

type GameListItemProps = {
  game: EndedGame
}

const GameListItem = ({ game }: GameListItemProps) => (
  <Card>
    <VStack className='shadow-md'>
      <VersusBackground
        codexOne={game.playerOne.army.codex.name}
        codexTwo={game.playerTwo.army.codex.name}
      />
      <VStack
        className='p-4'
        space='md'
      >
        <HStack className='justify-end'>
          <Badge
            text={formatDistanceToNow(new Date(game.lastUpdate), {
              addSuffix: true
            })}
            variant='primary'
          />
        </HStack>
        <Scoreboard
          playerOne={game.playerOne}
          playerTwo={game.playerTwo}
        />
      </VStack>
    </VStack>
    <HStack className='justify-between p-4 py-2'>
      <PlayerTag player={game.playerOne} />
      <PlayerTag
        player={game.playerTwo}
        reversed
      />
    </HStack>
  </Card>
)

export default GameListItem