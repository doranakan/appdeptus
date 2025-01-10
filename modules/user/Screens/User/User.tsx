import logo from 'appdeptus/assets/svg/logo.svg'
import {
  Avatar,
  Card,
  Disclaimer,
  HStack,
  Loading,
  NavigationHeader,
  ScreenContainer,
  Text,
  TextLink,
  VStack
} from 'appdeptus/components'
import { formatDate } from 'date-fns'
import * as Application from 'expo-application'
import { Link } from 'expo-router'
import { Bot, Code, Cog } from 'lucide-react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SvgXml } from 'react-native-svg'
import { useGetUserProfileQuery } from '../../api'
import CommunityCard from './CommunityCard'

const UserScreen = () => {
  const { data } = useGetUserProfileQuery()

  if (!data) {
    return (
      <ScreenContainer className='items-center justify-center'>
        <Loading />
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
          icon: Cog,
          variant: 'link',
          href: 'user/settings'
        }}
      />

      <ScrollView
        contentContainerClassName='pb-4'
        showsVerticalScrollIndicator={false}
      >
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
              <Link
                href='./edit-name'
                relativeToDirectory
              >
                <Text
                  family='heading-regular'
                  size='2xl'
                >
                  {data.name}
                </Text>
              </Link>
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
                description='Join our server and meet the community, report bugs and keep updated the Appdeptus data.'
                Icon={Bot}
                link='https://discord.gg/Fh9N8bDR'
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
            <Disclaimer />
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
