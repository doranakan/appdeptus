import { GoogleSignin } from '@react-native-google-signin/google-signin'
import googleIcon from 'appdeptus/assets/svg/google.svg'
import { Card, HStack, Pressable, Text, useToast } from 'appdeptus/components'
import { router } from 'expo-router'
import { memo } from 'react'
import { SvgXml } from 'react-native-svg'
import { useSignInWithGoogleMutation } from '../../api'

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS,
  forceCodeForRefreshToken: true,
  offlineAccess: true
})

const SignInWithGoogle = () => {
  const [signInWithGoogle, { isLoading }] = useSignInWithGoogleMutation()

  const { show } = useToast()

  return (
    <Pressable
      onPress={async () => {
        const res = await signInWithGoogle()

        if ('error' in res) {
          show({ title: '⚠️ error', description: String(res.error) })
          return
        }

        router.replace('/')
      }}
      disabled={isLoading}
    >
      <Card>
        <HStack
          className='items-center justify-center p-4'
          space='lg'
          style={{ backgroundColor: 'white', height: 56 }}
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
            Sign in with Google
          </Text>
        </HStack>
      </Card>
    </Pressable>
  )
}

export default memo(SignInWithGoogle)
