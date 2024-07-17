import {
  HStack,
  Heading,
  Icon,
  Pressable,
  Spinner,
  Text
} from '@gluestack-ui/themed'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { Link } from 'expo-router'
import { PlusCircle } from 'lucide-react-native'

const Header = () => {
  const { data } = useGetUserProfileQuery()

  return (
    <HStack justifyContent='center'>
      <Heading
        textTransform='capitalize'
        size='4xl'
      >
        Armies
      </Heading>
      <HStack
        alignItems='center'
        h='$full'
        justifyContent='space-between'
        position='absolute'
        w='$full'
      >
        <Link
          asChild
          href='user'
        >
          <Pressable
            alignItems='center'
            bg='$secondary700'
            borderRadius='$full'
            disabled={!data}
            h='$8'
            justifyContent='center'
            w='$8'
          >
            {!data ? (
              <Spinner />
            ) : (
              <Text
                bold
                color='$secondary50'
                lineHeight='$3xl'
                textAlign='center'
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
              color='$primary500'
              size='xl'
            />
          </Pressable>
        </Link>
      </HStack>
    </HStack>
  )
}

export default Header
