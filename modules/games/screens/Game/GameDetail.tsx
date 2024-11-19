import {
  Badge,
  GameDataTable,
  HStack,
  PlayerTag,
  VStack
} from 'appdeptus/components'
import { type Army } from 'appdeptus/models'
import { type Player } from 'appdeptus/models/game'
import { type ComponentProps, memo, useMemo } from 'react'

type GameDetailProps = {
  playerOne: Player
  playerTwo: Player
}

const GameDetail = ({ playerOne, playerTwo }: GameDetailProps) => {
  const data = useMemo<ComponentProps<typeof GameDataTable>['data']>(
    () => [
      // {
      //   title: 'Warlord',
      //   valueL:
      //     playerOne.army.composition.warlord.type === 'team'
      //       ? playerOne.army.composition.warlord.leader.name
      //       : playerOne.army.composition.warlord.name,
      //   valueR:
      //     playerTwo.army.composition.warlord.type === 'team'
      //       ? playerTwo.army.composition.warlord.leader.name
      //       : playerTwo.army.composition.warlord.name
      // },
      {
        title: 'Points',
        valueL: `${playerOne.army.points}PTS`,
        valueR: `${playerOne.army.points}PTS`
      },
      {
        title: 'Command points',
        valueL: String(playerOne.cp),
        valueR: String(playerTwo.cp)
      },
      {
        title: 'Kills',
        valueL: String(0),
        valueR: String(0)
      },
      {
        title: 'Units Destroyed',
        valueL: String(0),
        valueR: String(0)
      },
      {
        title: 'Units',
        valueL: String(calcNumberOfUnits(playerOne.army.composition)),
        valueR: String(calcNumberOfUnits(playerTwo.army.composition))
      },
      {
        title: 'Units Left',
        valueL: String(calcNumberOfUnits(playerOne.army.composition)),
        valueR: String(calcNumberOfUnits(playerTwo.army.composition))
      },
      {
        title: 'Models',
        valueL: String(calcNumberOfModels(playerOne.army.composition)),
        valueR: String(calcNumberOfModels(playerTwo.army.composition))
      },
      {
        title: 'Models Left',
        valueL: String(calcNumberOfModels(playerOne.army.composition)),
        valueR: String(calcNumberOfModels(playerTwo.army.composition))
      }
    ],
    [playerOne, playerTwo]
  )

  return (
    <VStack space='md'>
      <HStack className='justify-between'>
        <PlayerTag player={playerOne.profile} />
        <PlayerTag
          player={playerTwo.profile}
          reversed
        />
      </HStack>
      <HStack className='justify-between'>
        <Badge
          text={playerOne.army.composition.detachment.name}
          codex={playerOne.army.codex.name}
        />

        <Badge
          text={playerTwo.army.composition.detachment.name}
          codex={playerTwo.army.codex.name}
        />
      </HStack>
      <GameDataTable data={data} />
    </VStack>
  )
}

const calcNumberOfUnits = (composition: Army['composition']) => {
  const characters = composition.characters.length
  const leaders = composition.leaders.length
  const squads = composition.squads.length
  const transports = composition.transports.length
  const vehicles = composition.vehicles.length

  const teams = composition.teams.length * 2

  return characters + leaders + squads + transports + vehicles + teams
}

const calcNumberOfModels = (composition: Army['composition']) =>
  [
    ...composition.characters,
    ...composition.leaders,
    ...composition.squads,
    ...composition.transports,
    ...composition.vehicles,
    ...composition.teams.flatMap(({ bodyguard, leader }) => [bodyguard, leader])
  ].reduce((acc, { tier }) => (acc += tier.models), 0)

export default memo(GameDetail)
