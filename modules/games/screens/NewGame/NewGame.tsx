import { VStack } from '@gluestack-ui/themed'
import { type Army } from 'appdeptus/models'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { ArmySelector, Background, PlayersContainer } from '../../components'

import { Loading } from 'appdeptus/components'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from './Header'

const NewGameScreen = () => {
  const insets = useSafeAreaInsets()

  const [selectedArmy, setSelectedArmy] = useState<
    Omit<Army, 'units' | 'detachment'> | undefined
  >()

  const { data } = useGetUserProfileQuery()

  if (!data) {
    return <Loading />
  }

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
        pb='$8'
        pt={insets.top}
        px='$4'
      >
        <Header selectedArmyId={selectedArmy?.id} />

        <PlayersContainer
          armyOne={selectedArmy}
          nameOne={data?.name}
        />
      </VStack>

      <ArmySelector
        selectedArmy={selectedArmy?.id}
        onArmySelected={setSelectedArmy}
      />
    </VStack>
  )
}

export default NewGameScreen
