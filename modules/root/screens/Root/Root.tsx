import { logo } from 'appdeptus/assets'
import { Background, Disclaimer, Text, VStack } from 'appdeptus/components'
import sign_in from 'assets/resources/misc/sign_in.jpg'
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
            source={sign_in}
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
          <Disclaimer />
        </VStack>
      </SafeAreaView>
    </VStack>
  </KeyboardAvoidingView>
)

export default RootScreen
