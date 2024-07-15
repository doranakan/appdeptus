import { HStack, Icon, Pressable, Spinner, Text } from '@gluestack-ui/themed'
import { useToast } from 'appdeptus/components'
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
    <HStack justifyContent='space-between'>
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
        onPress={StartGameAndSelectPlayerTwo}
      >
        <HStack
          alignContent='center'
          gap='$2'
        >
          <Text
            color='$secondary50'
            size='lg'
          >
            Play
          </Text>
          {isLoading ? (
            <Spinner color='$white' />
          ) : (
            <Icon
              as={Swords}
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
