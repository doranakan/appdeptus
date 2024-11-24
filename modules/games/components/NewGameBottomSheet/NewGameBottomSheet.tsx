import {
  BottomSheet,
  Button,
  Card,
  TabMenu,
  Text,
  VStack
} from 'appdeptus/components'
import { router } from 'expo-router'
import { QrCode, Scan } from 'lucide-react-native'
import { memo, useState } from 'react'
import ref from './ref'

const NewGameBottomSheet = () => {
  const [playerRole, setPlayerRole] = useState<'attacker' | 'defender'>(
    'attacker'
  )

  return (
    <BottomSheet
      ref={ref}
      scrollDisabled
    >
      <VStack space='md'>
        <Text
          className='text-center'
          family='body-bold'
          size='lg'
        >
          Roll the Dice
        </Text>

        <Card>
          <VStack
            className='p-4'
            space='md'
          >
            <Text family='body-regular-italic'>
              To determine your role in this sacred conflict, roll the dice.
              Fate will decide: attacker or defender.
            </Text>
            <Text family='body-regular-italic'>
              If fate names you the attacker, your task is to generate a QR code
              — a digital artifact of power — for the defender to scan,
              signaling the start of the game. The dice have spoken; the battle
              awaits!
            </Text>
            <TabMenu
              onOptionSelected={setPlayerRole}
              options={['attacker', 'defender'] as const}
            />
          </VStack>
        </Card>
        {playerRole === 'attacker' ? (
          <Button
            onPress={() => {
              ref.current?.dismiss()
              router.push('games/new/qr-code')
            }}
            variant='callback'
            icon={QrCode}
            text='generate qr code'
          />
        ) : (
          <Button
            onPress={() => {
              ref.current?.dismiss()
              router.push('games/new/camera')
            }}
            icon={Scan}
            variant='callback'
            text='open auspex'
          />
        )}
      </VStack>
    </BottomSheet>
  )
}

export default memo(NewGameBottomSheet)
