import { Card, TabMenu, Text, VStack } from 'appdeptus/components'
import { useState } from 'react'
import { PrivacyLink } from '../../components'
import Form from './Form'
import SignInWithApple from './SignInWithApple'
import SignInWithGoogle from './SignInWithGoogle'
import SignInWithMicrosoft from './SignInWithMicrosoft'

const SignIn = () => {
  const [signInMode, setSignInMode] = useState<'social' | 'email'>('social')

  return (
    <Card>
      <VStack
        className='p-4'
        space='md'
      >
        <Text
          family='heading-regular'
          size='xl'
        >
          Sign in
        </Text>
        {__DEV__ ? (
          <TabMenu
            onOptionSelected={setSignInMode}
            options={['social', 'email']}
          />
        ) : null}
        {signInMode === 'social' ? (
          <VStack space='md'>
            <SignInWithGoogle />
            <SignInWithApple />
            <SignInWithMicrosoft />
            <PrivacyLink />
          </VStack>
        ) : (
          <Form />
        )}
      </VStack>
    </Card>
  )
}

export default SignIn
