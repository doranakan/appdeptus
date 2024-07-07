import { VStack } from '@gluestack-ui/themed'
import { type Army } from 'appdeptus/models'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { PlayersContainer } from '../../components'
import ArmySelector from './ArmySelector'
import Background from './Background'
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

      <Background codex={selectedArmy?.codex.name} />

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
