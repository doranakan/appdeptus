import { logo } from 'appdeptus/assets'
import { Background, Text, VStack } from 'appdeptus/components'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SvgXml } from 'react-native-svg'
import SignIn from './SignIn'

const RootScreen = () => (
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    style={{ flex: 1 }}
  >
    <VStack className='flex-1 bg-primary-950'>
      <VStack className='absolute h-full w-full'>
        <VStack className='flex-1'>
          <Background
            blurhash='L58gQuMxoMsVS6wbNHNH4;SP};%0'
            source='sign_in'
            gradient
          />
        </VStack>
        <VStack className='flex-1' />
      </VStack>
      <SafeAreaView style={{ flex: 1 }}>
        <VStack
          className='flex-1 bg-transparent p-4'
          space='2xl'
        >
          <VStack
            className='flex-1 items-center justify-center'
            space='md'
          >
            <SvgXml
              xml={logo}
              height={100}
              width={100}
            />
            <Text
              className='text-center'
              family='heading-regular'
              size='4xl'
            >
              Appdeptus
            </Text>
            <Text className='text-center'>
              Unofficial Warhammer 40.000™ companion app
            </Text>
          </VStack>
          <SignIn />
          <Text size='xs'>
            This app is a fan-made project and is not affiliated with or
            endorsed by Games Workshop Group PLC. Warhammer 40,000 and all
            related trademarks, logos, and imagery are the property of Games
            Workshop. All rights to the original content, including but not
            limited to characters, names, and game mechanics, are owned by Games
            Workshop Group PLC. This app is intended for entertainment and
            informational purposes only and is made by fans for fans.
          </Text>
        </VStack>
      </SafeAreaView>
    </VStack>
  </KeyboardAvoidingView>
)

export default RootScreen
