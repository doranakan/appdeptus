import {
  ArmyBackground,
  Badge,
  Card,
  HStack,
  PlayerTag,
  Text,
  themeColors,
  VStack
} from 'appdeptus/components'
import { type CodexName } from 'appdeptus/models'
import { type EndedGame } from 'appdeptus/models/game'
import clsx from 'clsx'
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
        <HStack className='items-center'>
          <Text
            className='uppercase'
            family='body-bold'
            size='4xl'
          >
            {mapCodexNameToShortName[game.playerOne.army.codex.name]}
          </Text>
          <HStack
            className='flex-1 justify-center'
            space='md'
          >
            <Text
              className={clsx([
                game.playerOne.score < game.playerTwo.score && 'opacity-60'
              ])}
              family='heading-regular'
              size='5xl'
            >
              {game.playerOne.score}
            </Text>
            <Text
              family='heading-regular'
              size='5xl'
            >
              -
            </Text>
            <Text
              className={clsx([
                game.playerOne.score > game.playerTwo.score && 'opacity-60'
              ])}
              family='heading-regular'
              size='5xl'
            >
              {game.playerTwo.score}
            </Text>
          </HStack>
          <Text
            className='uppercase'
            family='body-bold'
            size='4xl'
          >
            {mapCodexNameToShortName[game.playerTwo.army.codex.name]}
          </Text>
        </HStack>
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

const mapCodexNameToShortName = {
  'Adepta Sororitas': 'sor',
  'Adeptus Custodes': 'cus',
  'Adeptus Mechanicus': 'mec',
  Aeldari: 'ael',
  'Agents of the Imperium': 'agn',
  'Astra Militarum': 'ast',
  'Black Templars': 'blt',
  'Blood Angels': 'bla',
  'Chaos Daemons': 'dae',
  'Chaos Space Marines': 'csm',
  'Dark Angels': 'dra',
  'Death Guard': 'dgr',
  Drukhari: 'dru',
  'Genestealer Cults': 'gns',
  'Grey Knights': 'gkn',
  'Leagues of Votann': 'lov',
  Necrons: 'nec',
  Orks: 'ork',
  'Space Marines': 'spm',
  'Space Wolves': 'spw',
  "T'Au Empire": 'tau',
  'Thousand Sons': 'ths',
  Tyranids: 'tyr',
  'World Eaters': 'wre'
} as const satisfies Record<CodexName, string>

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    height: '100%',
    width: '100%'
  }
})

export default GameListItem
