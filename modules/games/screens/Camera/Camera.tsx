import { useAsyncEffect } from 'ahooks'
import qrCode from 'appdeptus/assets/lotties/qr-code.json'
import {
  Button,
  Loading,
  ScreenContainer,
  Text,
  useToast,
  VStack
} from 'appdeptus/components'
import InnerBorder from 'appdeptus/components/InnerBorder'
import { type CreateGame } from 'appdeptus/models/game'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { router } from 'expo-router'
import LottieView from 'lottie-react-native'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useGoToLobbyMutation } from '../../api'
import { NEW_GAME_SLUG } from '../../constants'

const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions()

  const { watch } = useFormContext<CreateGame>()

  const [goToLobby, { isLoading }] = useGoToLobbyMutation()

  const [gameId, setGameId] = useState<number>()

  const { show } = useToast()

  useAsyncEffect(async () => {
    if (gameId && !isLoading) {
      const res = await goToLobby({ gameId, army: watch('playerOne.army') })

      if ('error' in res) {
        show({ title: '⚠️ error', description: String(res.error) })
        return
      }

      router.dismissAll()

      router.replace(`game/${gameId}/lobby`)
    }
  }, [gameId])

  if (!permission) {
    return (
      <ScreenContainer className='items-center justify-center'>
        <Loading />
      </ScreenContainer>
    )
  }

  if (!permission.granted) {
    return (
      <ScreenContainer
        className='items-center justify-center p-4'
        space='md'
      >
        <LottieView
          autoPlay
          source={qrCode}
          style={{
            width: 100,
            height: 100
          }}
        />
        <Text className='text-center'>
          By the Will of the machine God, grant the machine spirit access to the
          blessed lens. Unite flesh and metal in purpose!
        </Text>
        <Button
          onPress={requestPermission}
          text='grant access'
          variant='callback'
        />
      </ScreenContainer>
    )
  }

  return (
    <CameraView
      barcodeScannerSettings={{
        barcodeTypes: ['qr']
      }}
      onBarcodeScanned={(scan) => {
        if (scan.data.includes(NEW_GAME_SLUG)) {
          setGameId(Number(scan.data.replace(NEW_GAME_SLUG, '')))
        }
      }}
      style={{ flex: 1 }}
    >
      <VStack className='flex-1 bg-primary-950/60'>
        {isLoading ? (
          <VStack className='flex-1 items-center justify-center bg-primary-950/80'>
            <Loading />
          </VStack>
        ) : (
          <VStack
            className='p-4'
            space='md'
          >
            <Text
              family='heading-regular'
              size='2xl'
            >
              looking for data...
            </Text>
            <Text>
              Point your auspex scanner towards your opponent sygil (QR-Code)
            </Text>
            <VStack className='overflow-hidden rounded-3xl bg-primary-50/10'>
              <InnerBorder>
                <LottieView
                  autoPlay
                  source={qrCode}
                  style={{
                    aspectRatio: 1,
                    opacity: 0.4,
                    width: '100%'
                  }}
                />
              </InnerBorder>
            </VStack>
          </VStack>
        )}
      </VStack>
    </CameraView>
  )
}

export default CameraScreen
