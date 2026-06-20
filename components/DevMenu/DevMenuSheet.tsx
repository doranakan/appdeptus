import { BottomSheet, Button } from 'appdeptus/components'
import { router } from 'expo-router'
import { BookOpen } from 'lucide-react-native'
import { useCallback } from 'react'
import { Text, View } from 'react-native'
import { useDevMenu } from './DevMenuContext'

const DevMenuSheet = () => {
  const { sheetRef } = useDevMenu()

  const handleStorybookPress = useCallback(() => {
    sheetRef.current?.dismiss()
    router.push('/storybook')
  }, [sheetRef])

  return (
    <BottomSheet ref={sheetRef}>
      <View className='gap-4 pb-2'>
        <Text className='text-white font-bold text-lg text-center'>
          Dev Menu
        </Text>
        <Button
          variant='callback'
          color='secondary'
          icon={BookOpen}
          text='Launch Storybook'
          onPress={handleStorybookPress}
        />
      </View>
    </BottomSheet>
  )
}

export default DevMenuSheet
