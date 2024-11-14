import {
  BottomSheet,
  Card,
  Text,
  themeColors,
  VStack
} from 'appdeptus/components'
import { type NewGame } from 'appdeptus/models/game'
import { useWindowDimensions } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { useDeleteGameMutation } from '../../api'
import ref from './ref'
type QRCodeBottomSheetProps = {
  gameId: NewGame['id']
}

const QRCodeBottomSheet = ({ gameId }: QRCodeBottomSheetProps) => {
  const window = useWindowDimensions()

  const [deleteGame] = useDeleteGameMutation()

  return (
    <BottomSheet
      onDismiss={() => {
        deleteGame(gameId)
      }}
      ref={ref}
      scrollDisabled
    >
      <VStack space='md'>
        <Text
          className='text-center'
          family='body-bold'
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

export default QRCodeBottomSheet
