import {
  Box,
  HStack,
  Heading,
  Pressable,
  Text,
  VStack
} from '@gluestack-ui/themed'
import { ArmyIcon, Card, Loading } from 'appdeptus/components'
import { GameStatus, type Player } from 'appdeptus/models/game'
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
          href={`play/${item.id}`}
        >
          <Pressable>
            <Card
              bg={item.status !== GameStatus.ENDED ? '$primary50' : undefined}
              gap='$2'
              gradient={
                item.status !== GameStatus.ENDED ? 'primary' : 'secondary'
              }
              p='$2'
              opacity='$90'
            >
              <HStack justifyContent='space-between'>
                <Text>
                  Status:{' '}
                  <Text
                    bold
                    textTransform='capitalize'
                  >
                    {item.status}
                  </Text>
                </Text>
                <Text color='$secondary500'>
                  {formatDistance(new Date(item.created), new Date(), {
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
                    item.status === GameStatus.ENDED
                      ? item.playerOne.score > item.playerTwo.score
                      : false
                  }
                />
                <PlayerContainer
                  oneOrTwo='two'
                  player={item.playerTwo}
                  winner={
                    item.status === GameStatus.ENDED
                      ? item.playerOne.score < item.playerTwo.score
                      : false
                  }
                />
              </HStack>
            </Card>
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
      <Heading>{player.name}</Heading>

      <Heading color={winner ? '$primary500' : '$secondary300'}>
        {player.score}
      </Heading>
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

export default GameList
