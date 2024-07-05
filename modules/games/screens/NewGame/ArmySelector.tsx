import { VStack } from '@gluestack-ui/themed'
import { Button, Loading, useToast } from 'appdeptus/components'
import { useGetArmiesQuery } from 'appdeptus/modules/armies/api'
import { ArmyList } from 'appdeptus/modules/armies/components'
import { router } from 'expo-router'
import { Swords } from 'lucide-react-native'
import { useCallback, useState } from 'react'
import { useCreateGameMutation } from '../../api/hooks'

const ArmySelector = () => {
  const { data } = useGetArmiesQuery()

  const [selectedArmy, setSelectedArmy] = useState<string | undefined>()

  const [createGame, { isLoading }] = useCreateGameMutation()

  const showToast = useToast()

  const newGame = useCallback(
    async (armyId: string) => {
      const res = await createGame(armyId)

      console.log({ res })

      if ('error' in res) {
        showToast({
          title: 'Astropathic interference!',
          description: 'An error occurred'
        })
        return
      }

      router.back()
    },
    [createGame, showToast]
  )

  if (!data) {
    return <Loading />
  }

  return (
    <VStack
      flex={1}
      gap='$4'
    >
      <Button
        disabled={!selectedArmy}
        loading={isLoading}
        Icon={Swords}
        onPress={async () => {
          if (selectedArmy) {
            await newGame(selectedArmy)
          }
        }}
        text='New game'
      />
      <ArmyList
        armies={data}
        selectedArmy={selectedArmy}
        onPressArmy={setSelectedArmy}
      />
    </VStack>
  )
}

export default ArmySelector
