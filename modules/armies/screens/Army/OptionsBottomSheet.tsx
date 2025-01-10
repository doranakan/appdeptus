import { useBoolean } from 'ahooks'
import {
  BottomSheet,
  Button,
  ButtonGroup,
  Card,
  HStack,
  Text,
  useToast,
  VStack
} from 'appdeptus/components'
import { type Army } from 'appdeptus/models'
import clsx from 'clsx'
import { router } from 'expo-router'
import { Settings, ShareIcon, Swords, Trash2 } from 'lucide-react-native'
import { memo, useCallback } from 'react'
import { Platform, Share } from 'react-native'
import { useDeleteArmyMutation } from '../../api'
import OptionButton from './OptionButton'
import ref from './ref'

type OptionsBottomSheetProps = {
  army: Army
}

const OptionsBottomSheet = ({ army }: OptionsBottomSheetProps) => {
  const [deleteArmy, { isLoading }] = useDeleteArmyMutation()

  const [deletePromptVisible, { setFalse: hidePrompt, setTrue: showPrompt }] =
    useBoolean()

  const playWithArmy = useCallback(() => {
    ref.current?.dismiss()

    router.push(`new-game/${army.id}`)
  }, [army.id])

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
        <HStack
          className={clsx(deletePromptVisible && 'opacity-60')}
          style={{ justifyContent: 'space-evenly' }}
        >
          <OptionButton
            icon={Swords}
            onPress={playWithArmy}
            title='Play'
          />
          <OptionButton
            icon={ShareIcon}
            onPress={shareArmy}
            title='Share'
          />

          <OptionButton
            icon={Settings}
            onPress={editArmy}
            title='Edit'
          />
          <OptionButton
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
