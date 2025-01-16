import { type BottomSheetModal } from '@gorhom/bottom-sheet'
import { useBoolean } from 'ahooks'
import { BottomSheet, Button, Text, VStack } from 'appdeptus/components'
import { router, useLocalSearchParams } from 'expo-router'
import { memo, useEffect, useRef } from 'react'

const NewArmyBottomSheet = () => {
  const { showNewArmyBottomSheet } = useLocalSearchParams<{
    showNewArmyBottomSheet: string
  }>()

  const [viewed, { setTrue: setViewed }] = useBoolean()

  const ref = useRef<BottomSheetModal>(null)

  const dismiss = () => {
    ref.current?.dismiss()
  }

  useEffect(() => {
    if (!viewed && showNewArmyBottomSheet) {
      ref.current?.present()
      setViewed()
    }
  }, [setViewed, showNewArmyBottomSheet, viewed])

  return (
    <BottomSheet
      ref={ref}
      onDismiss={dismiss}
    >
      <VStack space='md'>
        <Text
          className='text-center'
          family='body-bold'
        >
          You have no armies!
        </Text>
        <Button
          variant='callback'
          onPress={() => {
            dismiss()
            router.push('army-builder')
          }}
          text='build new roster'
        />
        <Button
          variant='callback'
          color='secondary'
          size='sm'
          onPress={dismiss}
          text='later'
        />
      </VStack>
    </BottomSheet>
  )
}

export default memo(NewArmyBottomSheet)
