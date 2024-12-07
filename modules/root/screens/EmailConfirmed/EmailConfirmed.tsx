import cv from 'appdeptus/assets/lotties/curriculum-vitae.json'
import { Button, ScreenContainer, Text } from 'appdeptus/components'
import { router } from 'expo-router'
import LottieView from 'lottie-react-native'

const EmailConfirmedScreen = () => (
  <ScreenContainer
    className='items-center justify-center'
    space='md'
  >
    <LottieView
      autoPlay
      style={{
        width: 100,
        height: 100
      }}
      source={cv}
    />
    <Text
      family='heading-regular'
      size='2xl'
    >
      Email confirmed
    </Text>
    <Text className='text-center'>
      You are now an Appdept! Sign in with your new credentials, it is time roll
      some dice!
    </Text>
    <Button
      onPress={() => {
        if (router.canGoBack()) {
          router.dismissAll()
        }
        router.replace('root')
      }}
      variant='callback'
      text='Sign in'
    />
  </ScreenContainer>
)

export default EmailConfirmedScreen
