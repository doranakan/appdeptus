import { type EndedGame } from 'appdeptus/models/game'
import { formatDistanceToNow } from 'date-fns'
import { Medal } from 'lucide-react-native'
import Badge from '../Badge'
import Card from '../Card'
import PlayerTag from '../PlayerTag'
import Scoreboard from '../Scoreboard'
import Text from '../Text'
import { HStack, VStack } from '../ui'
import VersusBackground from '../VersusBackground'

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
        <HStack
          className='justify-end'
          space='sm'
        >
          <Badge
            Icon={game.community ? Medal : undefined}
            text={formatDistanceToNow(new Date(game.lastUpdate), {
              addSuffix: true
            })}
            variant='primary'
          />
        </HStack>
        <Scoreboard
          playerOne={game.playerOne}
          playerTwo={game.playerTwo}
          status='ended'
        />
      </VStack>
    </VStack>
    <VStack className='bg-primary-950/80 p-4 py-2'>
      {game.community ? (
        <HStack className='items-center justify-center'>
          <Text
            className='text-ellipsis'
            family='heading-regular'
            numberOfLines={1}
          >
            {game.community.name}
          </Text>
        </HStack>
      ) : null}
      <HStack className='justify-between'>
        <PlayerTag player={game.playerOne.profile} />
        <PlayerTag
          player={game.playerTwo.profile}
          reversed
        />
      </HStack>
    </VStack>
  </Card>
)

export default GameListItem
