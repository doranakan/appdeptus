import {
  BottomSheet,
  HStack,
  OptionButton,
  Text,
  VStack
} from 'appdeptus/components'
import { router } from 'expo-router'
import { QrCode, Scan } from 'lucide-react-native'
import { memo } from 'react'
import ref from './ref'

const NewGameBottomSheet = () => (
  <BottomSheet
    ref={ref}
    onPressBackdrop={() => ref.current?.dismiss()}
  >
    <VStack
      className='flex-1'
      space='md'
    >
      <Text
        className='text-center'
        family='body-bold'
        size='lg'
      >
        Prepare for war
      </Text>

      <HStack style={{ justifyContent: 'space-evenly' }}>
        <OptionButton
          onPress={() => {
            ref.current?.dismiss()
            router.push('new-game/qr-code')
          }}
          icon={QrCode}
          title='QR-Code'
        />
        <OptionButton
          onPress={() => {
            ref.current?.dismiss()
            router.push('new-game/camera')
          }}
          icon={Scan}
          title='Scanner'
        />
      </HStack>
    </VStack>
  </BottomSheet>
)

export default memo(NewGameBottomSheet)
