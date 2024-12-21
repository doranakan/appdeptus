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
import { type NewGame } from 'appdeptus/models/game'
import { BlurView } from 'expo-blur'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { router } from 'expo-router'
import LottieView from 'lottie-react-native'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useStartGameMutation } from '../../api'
import { NEW_GAME_SLUG } from '../../constants'

const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions()

  const { watch } = useFormContext<NewGame>()

  const [startGame, { isLoading }] = useStartGameMutation()

  const [gameId, setGameId] = useState<number>()

  const { show } = useToast()

  useAsyncEffect(async () => {
    if (gameId && !isLoading) {
      const res = await startGame({ gameId, army: watch('playerOne.army') })

      if ('error' in res) {
        show({ title: '⚠️ error', description: String(res.error) })
        return
      }

      router.dismissAll()

      router.replace(`game/${gameId}`)
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
          By the Will of the Omnissiah, grant the Machine Spirit access to the
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
          <BlurView style={{ flex: 1 }}>
            <VStack className='flex-1 items-center justify-center bg-primary-950/80'>
              <Loading />
            </VStack>
          </BlurView>
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
              Point your auspex towards your opponent Vox-Cogitator that shows
              the sygil
            </Text>
            <VStack className='overflow-hidden rounded-3xl bg-primary-50/10'>
              <InnerBorder>
                <BlurView intensity={15}>
                  <LottieView
                    autoPlay
                    source={qrCode}
                    style={{
                      aspectRatio: 1,
                      opacity: 0.4,
                      width: '100%'
                    }}
                  />
                </BlurView>
              </InnerBorder>
            </VStack>
          </VStack>
        )}
      </VStack>
    </CameraView>
  )
}

export default CameraScreen
