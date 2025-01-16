import appleIcon from 'appdeptus/assets/svg/apple.svg'
import { Card, HStack, Pressable, Text, useToast } from 'appdeptus/components'
import { memo } from 'react'
import { Platform } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { useSignInWithAppleMutation } from '../../api'
import useNavigateToHome from './useNavigateToHome'

type SignInWithAppleProps = {
  disabled?: boolean
}

const SignInWithApple = ({ disabled }: SignInWithAppleProps) => {
  const [signInWithApple, { isLoading }] = useSignInWithAppleMutation()

  const { show } = useToast()

  const navigateToHome = useNavigateToHome()

  if (Platform.OS !== 'ios') {
    return null
  }

  return (
    <Pressable
      onPress={async () => {
        const res = await signInWithApple()

        if ('error' in res) {
          show({ title: '⚠️ error', description: String(res.error) })
          return
        }

        navigateToHome(res.data.isNew)
      }}
      disabled={disabled ?? isLoading}
    >
      <Card variant={disabled ? 'disabled' : 'default'}>
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
