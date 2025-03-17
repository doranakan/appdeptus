import { GameArmyRoster, TabMenu, VStack } from 'appdeptus/components'
import { type ActiveGame, type EndedGame } from 'appdeptus/models/game'
import { memo, useState } from 'react'

type RosterProps = {
  game: ActiveGame | EndedGame
}

const Roster = ({ game }: RosterProps) => {
  const [selectedPlayer, setSelectedPlayer] = useState<'One' | 'Two'>('One')

  return (
    <VStack
      className='flex-1'
      space='md'
    >
      <TabMenu
        options={[
          game.playerOne.army.codex.name,
          game.playerTwo.army.codex.name
        ]}
        onOptionSelected={(_option, index) => {
          setSelectedPlayer(index === 0 ? 'One' : 'Two')
        }}
      />
      <GameArmyRoster roster={game[`player${selectedPlayer}`].army.roster} />
    </VStack>
  )
}

export default memo(Roster)
