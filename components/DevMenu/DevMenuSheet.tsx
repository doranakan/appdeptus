import { BottomSheet, Button } from 'appdeptus/components'
import { BookOpen } from 'lucide-react-native'
import { Text, View } from 'react-native'
import { useDevMenu } from './DevMenuContext'

const DevMenuSheet = () => {
  const { sheetRef, launchStorybook } = useDevMenu()

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
          onPress={launchStorybook}
        />
      </View>
    </BottomSheet>
  )
}

export default DevMenuSheet
