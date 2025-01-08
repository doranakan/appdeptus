import microsoftIcon from 'appdeptus/assets/svg/microsoft.svg'
import { Card, HStack, Pressable, Text, useToast } from 'appdeptus/components'
import { router } from 'expo-router'
import { memo } from 'react'
import { SvgXml } from 'react-native-svg'
import { useSignInWithOAuthMutation } from '../../api'

type SignInWithMicrosoftProps = {
  disabled?: boolean
}

const SignInWithMicrosoft = ({ disabled }: SignInWithMicrosoftProps) => {
  const [signInWithOAuth, { isLoading }] = useSignInWithOAuthMutation()

  const { show } = useToast()

  return (
    <Pressable
      onPress={async () => {
        const res = await signInWithOAuth('azure')

        if ('error' in res) {
          show({ description: String(res.error), title: '⚠️ error' })
          return
        }

        if (res.data.isNew) {
          router.replace('user/settings/edit-name')
          return
        }

        router.replace('/')
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
            xml={microsoftIcon}
          />
          <Text
            className='text-primary-800'
            family='body-medium'
            size='xl'
          >
            Sign in with Microsoft
          </Text>
        </HStack>
      </Card>
    </Pressable>
  )
}

export default memo(SignInWithMicrosoft)
