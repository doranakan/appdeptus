import { Box, HStack, Pressable, Text, VStack } from '@gluestack-ui/themed'
import { ArmyIcon, Loading } from 'appdeptus/components'
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
      ItemSeparatorComponent={() => <Box p='$2' />}
      renderItem={({ item }) => (
        <Link
          asChild
          href={
            item.status === 'ended'
              ? `play/ended/${item.id}`
              : `play/active/${item.id}`
          }
        >
          <Pressable opacity='$90'>
            <VStack
              bg={item.status !== 'ended' ? '$primary50' : undefined}
              borderRadius='$2xl'
              gap='$2'
              p='$2'
              opacity='$90'
            >
              <HStack justifyContent='space-between'>
                <HStack
                  bg='$secondary100'
                  borderRadius='$md'
                  px='$2'
                >
                  <Text
                    size='sm'
                    textTransform='capitalize'
                  >
                    {mapStatusToText[item.status]}
                  </Text>
                </HStack>
                <Text
                  color='$secondary500'
                  size='sm'
                >
                  {formatDistance(new Date(item.lastUpdate), new Date(), {
                    addSuffix: true
                  })}
                </Text>
              </HStack>
              <HStack
                gap='$4'
                justifyContent='space-between'
              >
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
    alignItems={oneOrTwo === 'two' ? 'flex-end' : 'flex-start'}
    flex={1}
    gap='$1'
  >
    <HStack
      borderBottomWidth='$1'
      borderLeftWidth={oneOrTwo === 'one' ? '$1' : '$0'}
      borderRightWidth={oneOrTwo === 'one' ? '$0' : '$1'}
      borderColor='$secondary700'
      px='$1'
      reversed={oneOrTwo === 'two'}
      justifyContent={'space-between'}
      w='$full'
    >
      <Text bold>{player.name}</Text>

      <Text
        bold
        color={winner ? '$primary500' : '$secondary300'}
      >
        {player.score}
      </Text>
    </HStack>
    <HStack
      alignItems='center'
      reversed={oneOrTwo === 'two'}
      gap='$1'
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
