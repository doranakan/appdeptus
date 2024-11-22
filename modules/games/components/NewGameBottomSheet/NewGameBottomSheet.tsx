import {
  BottomSheet,
  Card,
  Text,
  themeColors,
  VStack
} from 'appdeptus/components'
import { type NewGame } from 'appdeptus/models/game'
import { router } from 'expo-router'
import { memo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useWindowDimensions } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { useGameUpdateListener } from '../../api'
import ref from './ref'

const NewGameBottomSheet = () => {
  const { watch } = useFormContext<NewGame>()

  const gameId = watch('id')

  useGameUpdateListener({
    eventHandler: ({ new: { status } }) => {
      if (status) {
        ref.current?.dismiss()
        router.replace(`games/${gameId}`)
      }
    },
    gameId
  })

  const window = useWindowDimensions()

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
          Summon Reinforcements
        </Text>
        <Card>
          <QRCode
            size={window.width - 28}
            enableLinearGradient
            linearGradient={[
              themeColors.default.primary[950],
              themeColors.default.tertiary[950]
            ]}
            ecl='L'
            value={`appdeptus://games/new/${gameId}`}
          />
        </Card>
        <Text>
          Behold the sacred sigil. This is your rite of passage, a mark of
          allegiance, and a call to arms. Through this ritual scan, you accept
          the honor and peril of Warhammer 40K—only the bold endure, and only
          the relentless emerge triumphant. Prepare yourself, for the galaxy is
          fraught with darkness, and the Imperium awaits your valor.
        </Text>
      </VStack>
    </BottomSheet>
  )
}

export default memo(NewGameBottomSheet)
