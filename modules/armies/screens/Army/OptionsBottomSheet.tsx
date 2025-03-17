import { useBoolean } from 'ahooks'
import {
  BottomSheet,
  Button,
  ButtonGroup,
  Card,
  HStack,
  OptionButton,
  Text,
  useToast,
  VStack
} from 'appdeptus/components'
import { useCanCreateTeams, useCanEmbarkUnits } from 'appdeptus/hooks'
import { type Army } from 'appdeptus/models'
import { useGetGameQuery } from 'appdeptus/modules/games/api'
import { router } from 'expo-router'
import { Settings, ShareIcon, Swords, Trash2 } from 'lucide-react-native'
import React, { memo, useCallback } from 'react'
import { Platform, Share } from 'react-native'
import { useDeleteArmyMutation } from '../../api'
import ref from './ref'

type OptionsBottomSheetProps = {
  army: Army
}

const OptionsBottomSheet = ({ army }: OptionsBottomSheetProps) => {
  const [deleteArmy, { isLoading }] = useDeleteArmyMutation()

  const [deletePromptVisible, { setFalse: hidePrompt, setTrue: showPrompt }] =
    useBoolean()

  const canCreateTeams = useCanCreateTeams(army.roster)
  const canEmbarkUnits = useCanEmbarkUnits(army.roster)

  const { data: currentGame } = useGetGameQuery()

  const playWithArmy = useCallback(() => {
    ref.current?.dismiss()

    if (canCreateTeams) {
      router.push(`new-game/leader-selection?preselectedArmyId=${army.id}`)
      return
    }
    if (canEmbarkUnits) {
      router.push(`new-game/embarked-selection/?preselectedArmyId=${army.id}`)
      return
    }
    router.push(`new-game/double-check/?preselectedArmyId=${army.id}`)
  }, [army.id, canCreateTeams, canEmbarkUnits])

  const editArmy = useCallback(() => {
    ref.current?.dismiss()

    router.push(`army-builder/${army.id}`)
  }, [army.id])

  const { show } = useToast()

  const shareArmy = useCallback(() => {
    ref.current?.dismiss()

    const url = `https://open.appdeptus.com/share.html?id=${army.id}`

    Share.share({
      title: 'Share your army roster',
      message: Platform.select({
        android: `From the forges of Appdeptus comes a battle-tested roster!\n${url}`,
        ios: 'From the forges of Appdeptus comes a battle-tested roster!'
      }),
      url
    })
  }, [army.id])

  const handleDelete = useCallback(async () => {
    const res = await deleteArmy(army.id)

    if ('error' in res) {
      show({ title: '⚠️ error', description: String(res.error) })
      return
    }

    ref.current?.dismiss()

    router.back()
  }, [army.id, deleteArmy, show])

  return (
    <BottomSheet
      onPressBackdrop={() => {
        ref.current?.dismiss()
        hidePrompt()
      }}
      ref={ref}
      scrollDisabled
    >
      <VStack space='md'>
        <Text
          className='text-center'
          family='body-bold'
        >
          Options
        </Text>
        <HStack style={{ justifyContent: 'space-evenly' }}>
          {army.isValid ? (
            <>
              {!currentGame ? (
                <OptionButton
                  disabled={deletePromptVisible}
                  icon={Swords}
                  onPress={playWithArmy}
                  title='Play'
                />
              ) : null}
              <OptionButton
                disabled={deletePromptVisible}
                icon={ShareIcon}
                onPress={shareArmy}
                title='Share'
              />
            </>
          ) : null}

          <OptionButton
            disabled={deletePromptVisible}
            icon={Settings}
            onPress={editArmy}
            title='Edit'
          />
          <OptionButton
            disabled={deletePromptVisible}
            icon={Trash2}
            onPress={showPrompt}
            title='Delete'
          />
        </HStack>
        {deletePromptVisible ? (
          <Card>
            <HStack
              className='items-center p-4'
              space='md'
            >
              <Text className='flex-1'>
                Do you really want to delete this army?
              </Text>
              <ButtonGroup>
                <Button
                  color='primary'
                  disabled={isLoading}
                  onPress={hidePrompt}
                  variant='callback'
                  size='sm'
                  text='keep army'
                />
                <Button
                  disabled={isLoading}
                  loading={isLoading}
                  onPress={handleDelete}
                  variant='callback'
                  size='sm'
                  text='yes'
                />
              </ButtonGroup>
            </HStack>
          </Card>
        ) : null}
      </VStack>
    </BottomSheet>
  )
}

export default memo(OptionsBottomSheet)
