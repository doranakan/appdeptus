import { useMount } from 'ahooks'
import {
  Button,
  Card,
  Error,
  Loading,
  ScreenContainer,
  Text,
  useToast,
  VStack
} from 'appdeptus/components'
import { type NewGame } from 'appdeptus/models/game'
import { router } from 'expo-router'
import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import QRCode from 'react-native-qrcode-svg'
import {
  useCreateGameMutation,
  useGameUpdateListener,
  useLazyGetGameQuery
} from '../../api'
import { NEW_GAME_SLUG } from '../../constants'

const QRCodeScreen = () => {
  const { getValues } = useFormContext<NewGame>()

  const [createGame, { isLoading }] = useCreateGameMutation()

  const [getGame, { isLoading: isRefreshing }] = useLazyGetGameQuery()

  const [gameId, setGameId] = useState<number>(0)

  const window = useWindowDimensions()

  const { show } = useToast()

  const goToGame = useCallback(() => {
    router.dismissAll()

    router.replace(`game/${gameId}`)
  }, [gameId])

  const refreshStatus = useCallback(async () => {
    const res = await getGame(gameId)

    if ('data' in res && res.data) {
      goToGame()
    }
  }, [gameId, getGame, goToGame])

  useGameUpdateListener({
    gameId,
    eventHandler: (data) => {
      if (data.new.status) {
        goToGame()
      }
    }
  })

  useMount(async () => {
    if (!gameId) {
      const res = await createGame(getValues().playerOne.army)

      if ('error' in res) {
        show({ title: '⚠️ error', description: String(res.error) })
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
      <VStack className='h-2 w-16 self-center rounded-lg bg-primary-100' />
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
        Duty calls you to the frontlines, the survival of countless billions
        depends on your vigilance. This act may alter the fate of worlds.
      </Text>
      <Card>
        <QRCode
          value={`${NEW_GAME_SLUG}${gameId}`}
          size={window.width - 28}
        />
      </Card>
      <ScrollView contentContainerClassName='pb-4'>
        <Card>
          <VStack
            className='p-4'
            space='md'
          >
            <Text family='body-bold-italic'>
              +++ Instruction for your opponent: +++
            </Text>
            <Text>
              1. Retrieve your cogitator (mobile device) and ensure it is
              operational (appdeptus is installed correcly).
            </Text>
            <Text>
              2. Make sure you have at least one army ready for battle. If not,
              create one.
            </Text>
            <Text>3. Select your army to march to battle.</Text>
            <Text>
              4. Choose to be the Defender and scan the sacred sigil (QR code)
            </Text>
            <Text size='sm'>
              If the game does not start automatically press the button below
            </Text>
            <Button
              variant='callback'
              onPress={refreshStatus}
              loading={isRefreshing}
              color='secondary'
              text='refresh'
              size='sm'
            />
          </VStack>
        </Card>
      </ScrollView>
    </ScreenContainer>
  )
}

export default QRCodeScreen
