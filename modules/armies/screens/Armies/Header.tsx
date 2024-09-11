import { Heading } from 'appdeptus/components/ui/heading'
import { HStack } from 'appdeptus/components/ui/hstack'
import { Icon } from 'appdeptus/components/ui/icon'
import { Pressable } from 'appdeptus/components/ui/pressable'
import { Spinner } from 'appdeptus/components/ui/spinner'
import { Text } from 'appdeptus/components/ui/text'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { Link } from 'expo-router'
import { PlusCircle } from 'lucide-react-native'

const Header = () => {
  const { data } = useGetUserProfileQuery()

  return (
    <HStack className='justify-center'>
      <Heading
        textTransform='capitalize'
        size='2xl'
      >
        Armies
      </Heading>
      <HStack className='items-center h-full justify-between absolute w-full'>
        <Link
          asChild
          href='user'
        >
          <Pressable
            disabled={!data}
            className='items-center bg-secondary-700 rounded-full h-8 justify-center w-8'
          >
            {!data ? (
              <Spinner />
            ) : (
              <Text
                bold
                className='text-secondary-50 text-center'
              >
                {data.name[0]}
              </Text>
            )}
          </Pressable>
        </Link>
        <Link
          asChild
          href='army-builder'
        >
          <Pressable>
            <Icon
              as={PlusCircle}
              size='xl'
              className='text-primary-500'
            />
          </Pressable>
        </Link>
      </HStack>
    </HStack>
  )
}

export default Header
