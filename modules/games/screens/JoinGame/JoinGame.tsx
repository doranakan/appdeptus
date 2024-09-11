import { skipToken } from '@reduxjs/toolkit/query'
import { Loading } from 'appdeptus/components'
import { VStack } from 'appdeptus/components/ui/vstack'
import { type Army } from 'appdeptus/models'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useGetNewGameQuery } from '../../api'
import { ArmySelector, Background, PlayersContainer } from '../../components'
import Header from './Header'

const JoinGameScreen = () => {
  const insets = useSafeAreaInsets()

  const { gameId } = useLocalSearchParams<{ gameId: string }>()

  const { data: game } = useGetNewGameQuery(gameId ?? skipToken)
  const { data: userProfile } = useGetUserProfileQuery()

  const [selectedArmy, setSelectedArmy] = useState<
    Omit<Army, 'units' | 'detachment'> | undefined
  >()

  if (!game || !userProfile) {
    return <Loading />
  }

  return (
    <VStack className='flex-1'>
      <Background
        codexOne={game.playerOne.army.codex.name}
        codexTwo={selectedArmy?.codex.name}
      />
      <VStack className={` pt-${insets.top} flex-1 justify-between pb-8 px-4 `}>
        <Header
          gameId={game.id}
          selectedArmyId={selectedArmy?.id}
        />

        <PlayersContainer
          armyOne={game.playerOne.army}
          armyTwo={selectedArmy}
          nameOne={game.playerOne.name}
          nameTwo={userProfile.name}
        />
      </VStack>
      <ArmySelector
        selectedArmy={selectedArmy?.id}
        onArmySelected={setSelectedArmy}
      />
    </VStack>
  )
}

export default JoinGameScreen
