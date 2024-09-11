import { useToast } from 'appdeptus/components'
import { HStack } from 'appdeptus/components/ui/hstack'
import { Icon } from 'appdeptus/components/ui/icon'
import { Pressable } from 'appdeptus/components/ui/pressable'
import { Spinner } from 'appdeptus/components/ui/spinner'
import { Text } from 'appdeptus/components/ui/text'
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
    <HStack className='justify-between py-4'>
      <Link
        asChild
        href='../'
      >
        <Pressable>
          <HStack className='content-center'>
            <Icon
              as={ChevronLeft}
              size='xl'
              className='text-secondary-50'
            />
          </HStack>
        </Pressable>
      </Link>
      <Pressable
        disabled={!selectedArmyId}
        onPress={createGameAndSelectPlayerTwo}
      >
        <HStack className='items-center gap-2'>
          <Text
            size='lg'
            className='text-secondary-50'
          >
            Select Defender
          </Text>
          {isLoading ? (
            <Spinner className='text-white' />
          ) : (
            <Icon
              as={QrCode}
              size='xl'
              className='text-secondary-50'
            />
          )}
        </HStack>
      </Pressable>
    </HStack>
  )
}

export default Header
