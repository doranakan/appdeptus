import { useToast } from 'appdeptus/components'
import { HStack } from 'appdeptus/components/ui/hstack'
import { Icon } from 'appdeptus/components/ui/icon'
import { Pressable } from 'appdeptus/components/ui/pressable'
import { Spinner } from 'appdeptus/components/ui/spinner'
import { Text } from 'appdeptus/components/ui/text'
import { Link, router } from 'expo-router'
import { ChevronLeft, Swords } from 'lucide-react-native'
import { useCallback } from 'react'
import { useStartGameMutation } from '../../api'

type HeaderProps = {
  gameId: string
  selectedArmyId: string | undefined
}

const Header = ({ gameId, selectedArmyId }: HeaderProps) => {
  const [startGame, { isLoading }] = useStartGameMutation()

  const showToast = useToast()

  const StartGameAndSelectPlayerTwo = useCallback(async () => {
    if (selectedArmyId) {
      const res = await startGame({ armyId: selectedArmyId, gameId })

      if ('error' in res) {
        showToast({
          title: 'Astropathic interference!',
          description: 'An error occurred'
        })
        return
      }

      router.replace({
        pathname: `play/active/${gameId}`
      })
    }
  }, [selectedArmyId, startGame, gameId, showToast])

  return (
    <HStack className='justify-between'>
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
        onPress={StartGameAndSelectPlayerTwo}
      >
        <HStack className='content-center gap-2'>
          <Text
            size='lg'
            className='text-secondary-50'
          >
            Play
          </Text>
          {isLoading ? (
            <Spinner className='text-white' />
          ) : (
            <Icon
              as={Swords}
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
