import logo from 'appdeptus/assets/svg/logo.svg'
import {
  Avatar,
  Card,
  HStack,
  NavigationHeader,
  ScreenContainer,
  Text,
  TextLink,
  VStack
} from 'appdeptus/components'
import { useSignOutMutation } from 'appdeptus/modules/root/api'
import { formatDate } from 'date-fns'
import * as Application from 'expo-application'
import { Bot, Code, LogOut } from 'lucide-react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SvgXml } from 'react-native-svg'
import { useGetUserProfileQuery } from '../../api'
import CommunityCard from './CommunityCard'

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

      <ScrollView>
        <VStack space='md'>
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

          <Card>
            <VStack
              className='p-4'
              space='md'
            >
              <Text
                className='uppercase'
                family='body-bold'
              >
                community
              </Text>
              <CommunityCard
                cta='join our discord'
                description='Join our server and meet the community, report bugs and keep updated Appdeptus data.'
                Icon={Bot}
                link='https://discord.gg/T52Bc5Fe'
                title='discord'
              />
              <CommunityCard
                cta='contribute on gituhb'
                description='This is an open-source project, no heresy hidden!'
                Icon={Code}
                link='https://github.com/doranakan/appdeptus'
                title='github'
              />
            </VStack>
          </Card>

          <VStack space='md'>
            <Text size='xs'>
              This app is a fan-made project and is not affiliated with or
              endorsed by Games Workshop Group PLC. Warhammer 40,000 and all
              related trademarks, logos, and imagery are the property of Games
              Workshop. All rights to the original content, including but not
              limited to characters, names, and game mechanics, are owned by
              Games Workshop Group PLC. This app is intended for entertainment
              and informational purposes only and is made by fans for fans.
            </Text>
            <HStack className='justify-between'>
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
                  <Text family='body-bold'>Appdeptus</Text>{' '}
                  {`v${Application.nativeApplicationVersion}`}
                </Text>
              </HStack>

              <TextLink href='user/privacy-policy'>Privacy policy</TextLink>
            </HStack>
          </VStack>
        </VStack>
      </ScrollView>
    </ScreenContainer>
  )
}

export default UserScreen
