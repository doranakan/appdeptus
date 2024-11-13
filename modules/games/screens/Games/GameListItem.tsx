import {
  ArmyBackground,
  Badge,
  Card,
  HStack,
  PlayerTag,
  Scoreboard,
  themeColors,
  VStack
} from 'appdeptus/components'
import { type EndedGame } from 'appdeptus/models/game'
import { formatDistanceToNow } from 'date-fns'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet } from 'react-native'

type GameListItemProps = {
  game: EndedGame
}

const GameListItem = ({ game }: GameListItemProps) => (
  <Card>
    <VStack className='shadow-md'>
      <HStack className='absolute h-full w-full'>
        <VStack className='flex-1'>
          <ArmyBackground codex={game.playerOne.army.codex.name} />
          <LinearGradient
            colors={[
              `${themeColors.default.primary[950]}00`,
              themeColors.default.primary[950]
            ]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          />
        </VStack>
        <VStack className='flex-1'>
          <ArmyBackground codex={game.playerTwo.army.codex.name} />
          <LinearGradient
            colors={[
              themeColors.default.primary[950],
              `${themeColors.default.primary[950]}00`
            ]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          />
        </VStack>
      </HStack>
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

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    height: '100%',
    width: '100%'
  }
})

export default GameListItem
