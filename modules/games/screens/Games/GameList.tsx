import { ArmyIcon, Loading } from 'appdeptus/components'
import { Box } from 'appdeptus/components/ui/box'
import { HStack } from 'appdeptus/components/ui/hstack'
import { Pressable } from 'appdeptus/components/ui/pressable'
import { Text } from 'appdeptus/components/ui/text'
import { VStack } from 'appdeptus/components/ui/vstack'
import {
  type ActiveGame,
  type EndedGame,
  type Player
} from 'appdeptus/models/game'
import { formatDistance } from 'date-fns'
import { Link } from 'expo-router'
import { FlatList } from 'react-native'
import { useGetGamesQuery } from '../../api'

const GameList = () => {
  const { data } = useGetGamesQuery()

  if (!data) {
    return <Loading />
  }

  return (
    <FlatList
      data={data}
      keyExtractor={({ id }) => String(id)}
      ItemSeparatorComponent={() => <Box className='p-2' />}
      renderItem={({ item }) => (
        <Link
          asChild
          href={
            item.status === 'ended'
              ? `play/ended/${item.id}`
              : `play/active/${item.id}`
          }
        >
          <Pressable className='opacity-90'>
            <VStack
              className={` ${item.status !== 'ended' ? 'bg-primary-50' : undefined} rounded-2xl gap-2 p-2 opacity-90 `}
            >
              <HStack className='justify-between'>
                <HStack className='bg-secondary-100 rounded-md px-2'>
                  <Text
                    size='sm'
                    textTransform='capitalize'
                  >
                    {mapStatusToText[item.status]}
                  </Text>
                </HStack>
                <Text
                  size='sm'
                  className='text-secondary-500'
                >
                  {formatDistance(new Date(item.lastUpdate), new Date(), {
                    addSuffix: true
                  })}
                </Text>
              </HStack>
              <HStack className='gap-4 justify-between'>
                <PlayerContainer
                  oneOrTwo='one'
                  player={item.playerOne}
                  winner={
                    item.status === 'ended'
                      ? item.playerOne.score > item.playerTwo.score
                      : false
                  }
                />
                <PlayerContainer
                  oneOrTwo='two'
                  player={item.playerTwo}
                  winner={
                    item.status === 'ended'
                      ? item.playerOne.score < item.playerTwo.score
                      : false
                  }
                />
              </HStack>
            </VStack>
          </Pressable>
        </Link>
      )}
    />
  )
}

type PlayerContainerProps = {
  oneOrTwo: 'one' | 'two'
  player: Player
  winner: boolean
}

const PlayerContainer = ({
  oneOrTwo,
  player,
  winner
}: PlayerContainerProps) => (
  <VStack
    className={` ${oneOrTwo === 'two' ? 'items-end' : 'items-start'} flex-1 gap-1 `}
  >
    <HStack
      reversed={oneOrTwo === 'two'}
      className={` ${oneOrTwo === 'one' ? 'border-r-0' : 'border-r-1'} ${oneOrTwo === 'one' ? 'border-l-1' : 'border-l-0'} border-b-1 border-secondary-700 px-1 justify-between w-full `}
    >
      <Text bold>{player.name}</Text>

      <Text
        bold
        className={` ${winner ? 'text-primary-500' : 'text-secondary-300'} `}
      >
        {player.score}
      </Text>
    </HStack>
    <HStack
      reversed={oneOrTwo === 'two'}
      className='items-center gap-1'
    >
      <ArmyIcon
        codexName={player.army.codex.name}
        color='secondary700'
        h={16}
        w={16}
      />
      <Text
        ellipsizeMode='tail'
        numberOfLines={1}
      >
        {player.army.name}
      </Text>
    </HStack>
  </VStack>
)

const mapStatusToText: Record<
  ActiveGame['status'] | EndedGame['status'],
  string
> = {
  turn1_p1: 'Attacker Turn 1',
  turn1_p2: 'Defender Turn 1',
  turn2_p1: 'Attacker Turn 2',
  turn2_p2: 'Defender Turn 2',
  turn3_p1: 'Attacker Turn 3',
  turn3_p2: 'Defender Turn 3',
  turn4_p1: 'Attacker Turn 4',
  turn4_p2: 'Defender Turn 4',
  turn5_p1: 'Attacker Turn 5',
  turn5_p2: 'Defender Turn 5',
  ended: 'Ended'
} as const

export default GameList
