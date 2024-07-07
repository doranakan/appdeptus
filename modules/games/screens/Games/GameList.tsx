import { Box, HStack, Heading, Text, VStack } from '@gluestack-ui/themed'
import { ArmyIcon, Card } from 'appdeptus/components'
import { CodexName } from 'appdeptus/models'
import { FlatList } from 'react-native'
import PlayerCard from './PlayerCard'

const GameList = () => {
  return (
    <FlatList
      data={[
        {
          id: 1,
          playerOne: {
            armyPoints: 1950,
            codex: CodexName.AELDARI,
            name: 'Doranakan',
            gamePoints: 49,
            userId: '234598'
          },
          playerTwo: {
            armyPoints: 2000,
            codex: CodexName.TYRANIDS,
            name: 'Rygar',
            gamePoints: 61,
            userId: '345984'
          },
          date: 'Yesterday'
        }
      ]}
      ListHeaderComponent={() => (
        <VStack pb='$4'>
          <PlayerCard />
        </VStack>
      )}
      keyExtractor={({ id }) => String(id)}
      ItemSeparatorComponent={() => <Box p='$2' />}
      renderItem={({ item }) => (
        <Card
          p='$2'
          opacity='$90'
        >
          <HStack justifyContent='flex-end'>
            <Text color='$secondary500'>{item.date}</Text>
          </HStack>
          <HStack
            gap='$4'
            justifyContent='space-between'
          >
            <PlayerContainer
              {...item.playerOne}
              player={0}
              winner={item.playerOne.gamePoints > item.playerTwo.gamePoints}
            />
            <PlayerContainer
              {...item.playerTwo}
              player={1}
              winner={item.playerOne.gamePoints < item.playerTwo.gamePoints}
            />
          </HStack>
        </Card>
      )}
    />
  )
}

type PlayerContainerProps = {
  codex: CodexName
  name: string
  player: 0 | 1
  armyPoints: number
  gamePoints: number
  userId: string
  winner: boolean
}

const PlayerContainer = ({
  codex,
  name,
  player,
  armyPoints,
  gamePoints,
  userId,
  winner
}: PlayerContainerProps) => (
  <VStack
    alignItems={player ? 'flex-end' : 'flex-start'}
    flex={1}
    gap='$1'
  >
    <HStack
      borderBottomWidth='$1'
      borderLeftWidth={player ? '$1' : '$0'}
      borderRightWidth={player ? '$0' : '$1'}
      borderColor='$secondary700'
      px='$1'
      reversed={!!player}
      justifyContent={'space-between'}
      w='$full'
    >
      <Heading>{name}</Heading>

      <Heading color={winner ? '$primary500' : '$secondary300'}>
        {gamePoints}
      </Heading>
    </HStack>
    <HStack
      reversed={!!player}
      gap='$1'
    >
      <ArmyIcon
        codexName={codex}
        color='secondary700'
        h={16}
        w={16}
      />
      <Text>
        <Text bold>{codex}</Text> - {armyPoints}pts
      </Text>
    </HStack>
  </VStack>
)

export default GameList
