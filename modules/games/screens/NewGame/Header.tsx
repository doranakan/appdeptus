import { HStack, Icon, Pressable, Spinner, Text } from '@gluestack-ui/themed'
import { useToast } from 'appdeptus/components'
import { Link, router } from 'expo-router'
import { ChevronLeft, QrCode } from 'lucide-react-native'
import { useCallback } from 'react'
import { useCreateGameMutation } from '../../api'

type HeaderProps = {
  selectedArmyId: string | undefined
}

const Header = ({ selectedArmyId }: HeaderProps) => {
  const [createGame, { isLoading }] = useCreateGameMutation()

  const showToast = useToast()

  const createGameAndSelectPlayerTwo = useCallback(async () => {
    if (selectedArmyId) {
      const res = await createGame(selectedArmyId)

      if ('error' in res) {
        showToast({
          title: 'Astropathic interference!',
          description: 'An error occurred'
        })
        return
      }

      router.push({
        params: {
          gameId: res.data
        },
        pathname: './qr-code'
      })
    }
  }, [createGame, selectedArmyId, showToast])

  return (
    <HStack
      justifyContent='space-between'
      py='$4'
    >
      <Link
        asChild
        href='../'
      >
        <Pressable>
          <HStack alignContent='center'>
            <Icon
              as={ChevronLeft}
              color='$secondary50'
              size='xl'
            />
          </HStack>
        </Pressable>
      </Link>

      <Pressable
        disabled={!selectedArmyId}
        onPress={createGameAndSelectPlayerTwo}
      >
        <HStack
          alignItems='center'
          gap='$2'
        >
          <Text
            color='$secondary50'
            size='lg'
          >
            Select Defender
          </Text>
          {isLoading ? (
            <Spinner color='$white' />
          ) : (
            <Icon
              as={QrCode}
              color='$secondary50'
              size='xl'
            />
          )}
        </HStack>
      </Pressable>
    </HStack>
  )
}

export default Header
