import { useBoolean } from 'ahooks'
import {
  BottomSheet,
  Button,
  ButtonGroup,
  Card,
  HStack,
  Text,
  VStack
} from 'appdeptus/components'
import { type Army } from 'appdeptus/models'
import clsx from 'clsx'
import { router } from 'expo-router'
import { Settings, Share, Swords, Trash2 } from 'lucide-react-native'
import { memo, useCallback } from 'react'
import { useDeleteArmyMutation } from '../../api'
import ref from './ref'

type OptionsBottomSheetProps = {
  army: Army
}

const OptionsBottomSheet = ({ army }: OptionsBottomSheetProps) => {
  const [deleteArmy, { isLoading }] = useDeleteArmyMutation()

  const [deletePromptVisible, { setFalse: hidePrompt, setTrue: showPrompt }] =
    useBoolean()

  const handleDelete = useCallback(async () => {
    const res = await deleteArmy(army.id)

    if ('error' in res) {
      return
    }

    ref.current?.dismiss()

    router.back()
  }, [army.id, deleteArmy])

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
          <VStack
            className='items-center'
            space='xs'
          >
            <Button
              href=''
              variant='link'
              disabled
              icon={Swords}
              color='secondary'
            />
            <Text size='sm'>Play</Text>
          </VStack>
          <VStack
            className='items-center'
            space='xs'
          >
            <Button
              href=''
              variant='link'
              disabled
              icon={Share}
              color='secondary'
            />
            <Text size='sm'>Share</Text>
          </VStack>
          <VStack
            className='items-center'
            space='xs'
          >
            <Button
              href=''
              variant='link'
              disabled
              icon={Settings}
              color='secondary'
            />
            <Text size='sm'>Edit</Text>
          </VStack>
          <VStack
            className='items-center'
            space='xs'
          >
            <Button
              disabled={deletePromptVisible}
              icon={Trash2}
              onPress={showPrompt}
              variant='callback'
            />
            <Text size='sm'>Delete</Text>
          </VStack>
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
