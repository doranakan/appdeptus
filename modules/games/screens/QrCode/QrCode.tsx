import { Heading, Pressable, Text, VStack } from '@gluestack-ui/themed'
import { type RealtimePostgresUpdatePayload } from '@supabase/supabase-js'
import { BackgroundImage, Card, Loading } from 'appdeptus/components'
import { config } from 'appdeptus/designSystem'
import { Link, router, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useCallback } from 'react'
import { Platform, useWindowDimensions } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useGameUpdateListener, type RealTimeGame } from '../../api'

const QrCodeScreen = () => {
  const { gameId } = useLocalSearchParams<{ gameId: string }>()

  if (!gameId) {
    return <Loading />
  }

  return <QrCodeContent gameId={gameId} />
}

type QrCodeContentProps = {
  gameId: string
}

const QrCodeContent = ({ gameId }: QrCodeContentProps) => {
  const window = useWindowDimensions()

  const insets = useSafeAreaInsets()

  const onGameUpdated = useCallback(
    (payload: RealtimePostgresUpdatePayload<RealTimeGame>) => {
      if (payload.new.player_two) {
        router.back()
        router.replace(`play/active/${gameId}`)
      }
    },
    [gameId]
  )

  useGameUpdateListener({ eventHandler: onGameUpdated, gameId })

  return (
    <VStack
      flex={1}
      pt={Platform.OS === 'android' ? insets.top : undefined}
    >
      <StatusBar
        animated
        style='light'
      />

      <VStack
        h='$full'
        position='absolute'
        w='$full'
      >
        <BackgroundImage
          source='games'
          opacity={0.1}
        />
      </VStack>

      <VStack
        gap='$4'
        p='$4'
      >
        <Heading
          fontFamily='$mono'
          size='3xl'
          textAlign='center'
          textTransform='capitalize'
        >
          Get ready
        </Heading>

        <Card gap='$4'>
          <Link
            asChild
            href='games'
          >
            <Pressable>
              <QRCode
                backgroundColor='transparent'
                linearGradient={[
                  config.tokens.colors.secondary900,
                  config.tokens.colors.secondary700
                ]}
                enableLinearGradient
                logo={{
                  uri: 'icon_mono'
                }}
                logoBackgroundColor={config.tokens.colors.secondary50}
                logoMargin={10}
                logoSize={60}
                size={window.width - 50}
                value={`appdeptus://play/join/${gameId}`}
              />
            </Pressable>
          </Link>
          <VStack>
            <Heading>Time to roll some dice</Heading>

            <Text>
              Show this <Text bold>Qr Code</Text> to your opponent to let them
              select their army. Once they{"'"}ve made their choice, you{"'"}ll
              be automatically redirected to the game.
            </Text>
          </VStack>
          <Card bg='$light50'>
            <Text
              italic
              size='sm'
            >
              Your foe is well equipped, well-trained, battle-hardened. He
              believes his gods are on his side. Let him believe what he will.
              We have the tanks on ours.
            </Text>
          </Card>
        </Card>
      </VStack>
    </VStack>
  )
}

export default QrCodeScreen
