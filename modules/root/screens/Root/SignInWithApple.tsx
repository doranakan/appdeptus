import appleIcon from 'appdeptus/assets/svg/apple.svg'
import { Card, HStack, Pressable, Text } from 'appdeptus/components'
import { router } from 'expo-router'
import { memo } from 'react'
import { Platform } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { useSignInWithAppleMutation } from '../../api'

const SignInWithApple = () => {
  const [signInWithApple, { isLoading }] = useSignInWithAppleMutation()

  if (Platform.OS !== 'ios') {
    return null
  }

  return (
    <Pressable
      onPress={async () => {
        const res = await signInWithApple()

        if ('error' in res) {
          return
        }

        router.replace('/')
      }}
      disabled={isLoading}
    >
      <Card>
        <HStack
          className='items-center justify-center'
          space='lg'
          style={{ backgroundColor: 'black', height: 56 }}
        >
          <SvgXml
            height={24}
            width={24}
            xml={appleIcon}
            fill='white'
          />
          <Text
            family='body-bold'
            size='xl'
          >
            Sign in with Apple
          </Text>
        </HStack>
      </Card>
    </Pressable>
  )
}

export default memo(SignInWithApple)
