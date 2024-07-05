import { HStack, Icon, Pressable } from '@gluestack-ui/themed'
import { useSignOutMutation } from 'appdeptus/modules/root/api'
import { Link, router } from 'expo-router'
import { Bug, ChevronLeft, LogOut } from 'lucide-react-native'
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

    while (router.canGoBack()) {
      router.back()
    }
    router.replace('/')
  }, [signOutMutation])

  return (
    <HStack
      justifyContent='space-between'
      p='$4'
      pt={insets.top}
    >
      <Link
        asChild
        href='../'
      >
        <Pressable>
          <Icon
            as={ChevronLeft}
            color='$secondary100'
            size='xl'
          />
        </Pressable>
      </Link>
      <HStack gap='$8'>
        <Pressable>
          <Icon
            as={Bug}
            color='$secondary100'
            size='xl'
          />
        </Pressable>

        <Pressable onPress={signOut}>
          <Icon
            as={LogOut}
            color='$secondary100'
            size='xl'
          />
        </Pressable>
      </HStack>
    </HStack>
  )
}

export default Header
