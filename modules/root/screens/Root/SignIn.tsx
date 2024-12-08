import { Card, TabMenu, Text, VStack } from 'appdeptus/components'
import { useState } from 'react'
import { PrivacyLink } from '../../components'
import Form from './Form'
import SignInWithApple from './SignInWithApple'
import SignInWithGoogle from './SignInWithGoogle'

const SignIn = () => {
  const [signInMode, setSignInMode] = useState<'fast' | 'standard'>()

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
        <TabMenu
          onOptionSelected={setSignInMode}
          options={['fast', 'standard']}
        />
        {signInMode === 'fast' ? (
          <VStack space='md'>
            <SignInWithGoogle />
            <SignInWithApple />
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
