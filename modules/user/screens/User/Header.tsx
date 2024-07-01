import { HStack, Icon, Pressable } from '@gluestack-ui/themed'
import { useSignOutMutation } from 'appdeptus/modules/root/api'
import { router } from 'expo-router'
import { Bug, LogOut } from 'lucide-react-native'
import { useCallback } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Header = () => {
  const insets = useSafeAreaInsets()

  const [signOutMutation] = useSignOutMutation()

  const signOut = useCallback(async () => {
    const res = await signOutMutation()

    if ('error' in res) {
      return
    }

    router.replace('/')
  }, [signOutMutation])

  return (
    <HStack
      gap='$8'
      justifyContent='flex-end'
      p='$4'
      pt={insets.top}
    >
      <Pressable>
        <Icon
          as={Bug}
          color='$secondary100'
          size='lg'
        />
      </Pressable>
      <Pressable onPress={signOut}>
        <Icon
          as={LogOut}
          color='$secondary100'
          size='lg'
        />
      </Pressable>
    </HStack>
  )
}

export default Header
