import { VStack } from '@gluestack-ui/themed'
import { type Army } from 'appdeptus/models'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { ArmySelector, Background, PlayersContainer } from '../../components'

import Header from './Header'

const NewGameScreen = () => {
  const [selectedArmy, setSelectedArmy] = useState<
    Omit<Army, 'units'> | undefined
  >()

  return (
    <VStack flex={1}>
      <StatusBar
        animated
        style='light'
      />

      <Background codexOne={selectedArmy?.codex.name} />

      <VStack
        flex={1}
        justifyContent='space-between'
        px='$4'
        py='$8'
      >
        <Header selectedArmyId={selectedArmy?.id} />

        <PlayersContainer armyOne={selectedArmy} />
      </VStack>

      <ArmySelector
        selectedArmy={selectedArmy?.id}
        onArmySelected={setSelectedArmy}
      />
    </VStack>
  )
}

export default NewGameScreen
