import logo from 'appdeptus/assets/svg/logo.svg'
import {
  Avatar,
  HStack,
  NavigationHeader,
  ScreenContainer,
  Text,
  VStack
} from 'appdeptus/components'
import { useSignOutMutation } from 'appdeptus/modules/root/api'
import { formatDate } from 'date-fns'
import * as Application from 'expo-application'
import { LogOut } from 'lucide-react-native'
import { SvgXml } from 'react-native-svg'
import { useGetUserProfileQuery } from '../../api'

const UserScreen = () => {
  const { data } = useGetUserProfileQuery()

  const [signOut, { isLoading }] = useSignOutMutation()

  if (!data) {
    return (
      <ScreenContainer className='items-center justify-center'>
        {data}
      </ScreenContainer>
    )
  }

  return (
    <ScreenContainer
      className='p-4'
      safeAreaInsets={['bottom', 'top']}
      space='md'
    >
      <NavigationHeader
        variant='backButton'
        rightButton={{
          color: 'secondary',
          icon: LogOut,
          loading: isLoading,
          onPress: async () => {
            await signOut()
          },
          variant: 'callback'
        }}
      />

      <VStack className='flex-1 justify-between py-4'>
        <VStack
          className='items-center justify-center'
          space='md'
        >
          <Avatar
            user={data}
            size='2xl'
          />
          <VStack
            className='items-center justify-center'
            space='xs'
          >
            <Text
              family='heading-regular'
              size='2xl'
            >
              {data.name}
            </Text>
            <Text
              className='text-primary-400'
              family='body-bold'
            >
              {`Member since ${formatDate(new Date(data.createdAt), 'MMMM yyyy')}`}
            </Text>
          </VStack>
        </VStack>

        <VStack space='md'>
          <Text size='xs'>
            This app is a fan-made project and is not affiliated with or
            endorsed by Games Workshop Group PLC. Warhammer 40,000 and all
            related trademarks, logos, and imagery are the property of Games
            Workshop. All rights to the original content, including but not
            limited to characters, names, and game mechanics, are owned by Games
            Workshop Group PLC. This app is intended for entertainment and
            informational purposes only and is made by fans for fans.
          </Text>
          <HStack
            className='items-center'
            space='sm'
          >
            <SvgXml
              xml={logo}
              height={16}
              width={16}
            />
            <Text>
              <Text family='body-bold'>appdeptus</Text>{' '}
              {`v${Application.nativeApplicationVersion}`}
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </ScreenContainer>
  )
}

export default UserScreen
