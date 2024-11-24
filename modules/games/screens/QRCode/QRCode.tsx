import { useMount } from 'ahooks'
import {
  Card,
  Error,
  Loading,
  ScreenContainer,
  Text,
  VStack
} from 'appdeptus/components'
import { type NewGame } from 'appdeptus/models/game'
import { router } from 'expo-router'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useWindowDimensions } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { useCreateGameMutation, useGameUpdateListener } from '../../api'
import { NEW_GAME_SLUG } from '../../constants'

const QRCodeScreen = () => {
  const { getValues } = useFormContext<NewGame>()

  const [createGame, { isLoading }] = useCreateGameMutation()

  const [gameId, setGameId] = useState<number>(0)

  const window = useWindowDimensions()

  useGameUpdateListener({
    gameId,
    eventHandler: (data) => {
      if (data.new.status) {
        while (router.canGoBack()) {
          router.back()
        }

        router.push(`games/${gameId}`)
      }
    }
  })

  useMount(async () => {
    if (!gameId) {
      const res = await createGame(getValues().playerOne.army)

      if ('error' in res) {
        return
      }

      setGameId(res.data)
    }
  })

  if (isLoading) {
    return (
      <ScreenContainer className='items-center justify-center'>
        <Loading />
      </ScreenContainer>
    )
  }

  if (!gameId) {
    return (
      <ScreenContainer className='items-center justify-center'>
        <Error />
      </ScreenContainer>
    )
  }

  return (
    <ScreenContainer
      className='p-4'
      space='md'
    >
      <Text
        className='text-center'
        adjustsFontSizeToFit
        numberOfLines={1}
        family='heading-regular'
        size='4xl'
      >
        Ready for deployment
      </Text>
      <Text
        size='sm'
        family='body-regular-italic'
      >
        In the unyielding darkness of the 41st Millennium, duty calls you to the
        frontlines. The survival of countless billions depends on your
        vigilance. This act may alter the fate of worlds.
      </Text>
      <Card>
        <QRCode
          value={`${NEW_GAME_SLUG}${gameId}`}
          size={window.width - 28}
        />
      </Card>
      <Card>
        <VStack
          className='p-4'
          space='md'
        >
          <Text family='body-bold-italic'>
            +++ Instruction for your opponent: +++
          </Text>
          <Text size='sm'>
            1. Retrieve your Vox-Cogitator (mobile device) and ensure it is
            operational (appdeptus is installed correcly).
          </Text>
          <Text size='sm'>
            2. Make sure you have at least one army ready for battle. If not,
            create one.
          </Text>
          <Text size='sm'>3. Select your army to march to battle.</Text>
          <Text size='sm'>
            4. Choose to be the Defender and scan the sacred sigil (QR code)
          </Text>
        </VStack>
      </Card>
    </ScreenContainer>
  )
}

export default QRCodeScreen
