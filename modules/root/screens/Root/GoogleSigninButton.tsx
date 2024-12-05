import { GoogleSignin } from '@react-native-google-signin/google-signin'
import googleIcon from 'appdeptus/assets/svg/google.svg'
import { Card, HStack, Pressable, Text } from 'appdeptus/components'
import { router } from 'expo-router'
import { SvgXml } from 'react-native-svg'
import { useSignInWithGoogleMutation } from '../../api'

GoogleSignin.configure({
  scopes: ['email'],
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS,
  forceCodeForRefreshToken: true
})

const SignInWithGoogleButton = () => {
  const [signInWithGoogle, { isLoading }] = useSignInWithGoogleMutation()

  return (
    <Pressable
      onPress={async () => {
        const res = await signInWithGoogle()

        if ('error' in res) {
          return
        }

        router.replace('/')
      }}
      disabled={isLoading}
    >
      <Card>
        <HStack
          className='items-center bg-primary-50 p-4'
          space='xl'
        >
          <SvgXml
            height={24}
            width={24}
            xml={googleIcon}
          />
          <Text
            className='text-primary-800'
            family='body-medium'
            size='xl'
          >
            Sign In with Google
          </Text>
        </HStack>
      </Card>
    </Pressable>
  )
}

export default SignInWithGoogleButton
