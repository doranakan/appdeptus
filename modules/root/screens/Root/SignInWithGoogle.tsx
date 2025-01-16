import googleIcon from 'appdeptus/assets/svg/google.svg'
import { Card, HStack, Pressable, Text, useToast } from 'appdeptus/components'
import { memo } from 'react'
import { SvgXml } from 'react-native-svg'
import { useSignInWithGoogleMutation } from '../../api'
import useNavigateToHome from './useNavigateToHome'

type SignInWithGoogleProps = {
  disabled?: boolean
}

const SignInWithGoogle = ({ disabled }: SignInWithGoogleProps) => {
  const [signInWithGoogle, { isLoading }] = useSignInWithGoogleMutation()

  const { show } = useToast()

  const navigateToHome = useNavigateToHome()

  return (
    <Pressable
      onPress={async () => {
        const res = await signInWithGoogle()

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
