import logo from 'appdeptus/assets/svg/logo.svg'
import {
  CardMenu,
  Disclaimer,
  HStack,
  Loading,
  NavigationHeader,
  Profile,
  ScreenContainer,
  Text,
  TextLink,
  VStack
} from 'appdeptus/components'
import { useFeatureFlag } from 'appdeptus/hooks'
import * as Application from 'expo-application'
import { Cog } from 'lucide-react-native'
import { type ComponentProps, useMemo } from 'react'
import { SvgXml } from 'react-native-svg'
import { useGetUserProfileQuery } from '../../api'

const UserScreen = () => {
  const { data } = useGetUserProfileQuery()

  const discordInviteLink = useFeatureFlag('discord-invite-link')

  const communityLinks = useMemo<
    ComponentProps<typeof CardMenu>['items']
  >(() => {
    const items = [
      {
        href: 'https://github.com/doranakan/appdeptus',
        title: 'Contribute on GitHub',
        variant: 'external' as const
      }
    ]

    if (!discordInviteLink) {
      return items
    }

    return [
      ...items,
      {
        href: discordInviteLink,
        title: 'Join our Discord',
        variant: 'external'
      }
    ]
  }, [discordInviteLink])

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
      <Profile
        date={data.createdAt}
        {...data}
      />

      <VStack
        className='flex-1 justify-between py-4'
        space='md'
      >
        <CardMenu
          Header={
            <Text
              className='p-4 uppercase'
              family='body-bold'
            >
              Join the Appdeptus community
            </Text>
          }
          items={communityLinks}
        />

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
    </ScreenContainer>
  )
}

export default UserScreen
