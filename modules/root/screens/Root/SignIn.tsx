import { Card, TabMenu, Text, VStack } from 'appdeptus/components'
import { useState } from 'react'
import { PrivacyLink } from '../../components'
import Form from './Form'
import SignInWithGoogleButton from './GoogleSigninButton'

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
            <SignInWithGoogleButton />
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
