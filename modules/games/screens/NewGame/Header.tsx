import { HStack, Icon, Pressable, Spinner, Text } from '@gluestack-ui/themed'
import { useToast } from 'appdeptus/components'
import { Link, router } from 'expo-router'
import { QrCode, X } from 'lucide-react-native'
import { useCallback } from 'react'
import { useCreateGameMutation } from '../../api/hooks'

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
    <HStack justifyContent='space-between'>
      <Link
        asChild
        href='../'
      >
        <Pressable>
          <HStack alignContent='center'>
            <Icon
              as={X}
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
          alignContent='center'
          gap='$2'
        >
          <Text
            color='$secondary50'
            size='lg'
          >
            Player 2
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