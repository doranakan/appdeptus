import { type CodexName } from 'appdeptus/models'
import { type Player } from 'appdeptus/models/game'
import { memo } from 'react'
import Text from '../Text'
import { HStack } from '../ui'

type ScoreboardProps = {
  playerOne: Player
  playerTwo: Player
}

const Scoreboard = ({ playerOne, playerTwo }: ScoreboardProps) => (
  <HStack className='w-full items-center justify-between'>
    <Text
      size='3xl'
      className='uppercase'
      family='body-bold'
    >
      {codexToScoreboardName[playerOne.army.codex.name]}
    </Text>
    <HStack space='md'>
      <Text
        size='4xl'
        family='heading-regular'
      >
        {playerOne.score}
      </Text>
      <Text
        size='4xl'
        family='heading-regular'
      >
        -
      </Text>
      <Text
        size='4xl'
        family='heading-regular'
      >
        {playerTwo.score}
      </Text>
    </HStack>
    <Text
      size='3xl'
      className='uppercase'
      family='body-bold'
    >
      {codexToScoreboardName[playerTwo.army.codex.name]}
    </Text>
  </HStack>
)

const codexToScoreboardName = {
  'Adepta Sororitas': 'sor',
  'Adeptus Custodes': 'cus',
  'Adeptus Mechanicus': 'mec',
  Aeldari: 'ael',
  'Agents of the Imperium': 'age',
  'Astra Militarum': 'aml',
  'Black Templars': 'blt',
  'Blood Angels': 'bla',
  'Chaos Daemons': 'dae',
  'Chaos Space Marines': 'csm',
  'Dark Angels': 'dan',
  'Death Guard': 'dtg',
  Drukhari: 'dru',
  'Genestealer Cults': 'gsc',
  'Grey Knights': 'gkn',
  'Leagues of Votann': 'lov',
  Necrons: 'nec',
  Orks: 'ork',
  'Space Marines': 'spm',
  'Space Wolves': 'wol',
  "T'Au Empire": 'tau',
  'Thousand Sons': 'ths',
  Tyranids: 'tyr',
  'World Eaters': 'wre'
} as const satisfies Record<CodexName, string>

export default memo(Scoreboard)
