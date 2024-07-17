import { HStack, Heading, Text, VStack } from '@gluestack-ui/themed'
import * as Application from 'expo-application'
import { Link } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Footer = () => {
  const insets = useSafeAreaInsets()

  return (
    <VStack
      justifyContent='flex-end'
      flex={1}
      gap='$4'
      px='$4'
      pb={insets.bottom}
    >
      <Text
        fontSize='$2xs'
        lineHeight='$2xs'
        textAlign='justify'
      >
        This app is a fan-made project and is not affiliated with or endorsed by
        Games Workshop Group PLC. Warhammer 40,000 and all related trademarks,
        logos, and imagery are the property of Games Workshop. All rights to the
        original content, including but not limited to characters, names, and
        game mechanics, are owned by Games Workshop Group PLC. This app is
        intended for entertainment and informational purposes only and is made
        by fans for fans.
      </Text>
      <HStack justifyContent='space-between'>
        <Text>
          <Heading>Appdeptus</Heading>{' '}
          {`v${Application.nativeApplicationVersion}`}
        </Text>

        {__DEV__ ? (
          <Link href='/_sitemap'>
            <Text underline>Sitemap</Text>
          </Link>
        ) : undefined}
      </HStack>
    </VStack>
  )
}
export default Footer
