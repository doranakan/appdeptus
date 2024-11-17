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
    <VStack className='bg-primary-950 shadow-md'>
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
    <HStack className='justify-between bg-primary-950/80 p-4 py-2'>
      <PlayerTag player={game.playerOne.profile} />
      <PlayerTag
        player={game.playerTwo.profile}
        reversed
      />
    </HStack>
  </Card>
)

export default GameListItem
