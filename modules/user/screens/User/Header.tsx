import { HStack } from 'appdeptus/components/ui/hstack'
import { Icon } from 'appdeptus/components/ui/icon'
import { Pressable } from 'appdeptus/components/ui/pressable'
import { useSignOutMutation } from 'appdeptus/modules/root/api'
import { Link } from 'expo-router'
import { Bug, ChevronLeft, LogOut } from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Header = () => {
  const insets = useSafeAreaInsets()

  const [signOut] = useSignOutMutation()

  return (
    <HStack className={` pt-${insets.top} justify-between p-4 `}>
      <Link
        asChild
        href='../'
      >
        <Pressable>
          <Icon
            as={ChevronLeft}
            size='xl'
            className='text-secondary-100'
          />
        </Pressable>
      </Link>
      <HStack className='gap-8'>
        <Pressable>
          <Icon
            as={Bug}
            size='xl'
            className='text-secondary-100'
          />
        </Pressable>

        <Pressable onPress={signOut}>
          <Icon
            as={LogOut}
            size='xl'
            className='text-secondary-100'
          />
        </Pressable>
      </HStack>
    </HStack>
  )
}

export default Header
