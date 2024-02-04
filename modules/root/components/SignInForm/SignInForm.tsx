import { Text, VStack } from '@gluestack-ui/themed'
import { useBoolean } from 'ahooks'
import { Button, Input } from 'appdeptus/components'
import { supabase } from 'appdeptus/utils'
import { useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'

const SignInForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState('')

  const [isLoading, { setFalse: stopLoading, setTrue: startLoading }] =
    useBoolean()

  const router = useRouter()

  const signIn = useCallback(async () => {
    startLoading()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    stopLoading()

    if (error !== null) {
      setErrorMessage(error.message)

      return
    }
    router.replace('/home')
  }, [email, password, router, startLoading, stopLoading])

  return (
    <VStack space='md' w='$full'>
      <Input
        iconName='envelope'
        isInvalid={Boolean(errorMessage)}
        onChange={(e) => {
          setEmail(e.nativeEvent.text)
        }}
        placeholder='your@email.here'
        textTransform='lowercase'
        value={email}
      />

      <Input
        iconName='key'
        isInvalid={Boolean(errorMessage)}
        onChange={(e) => {
          setPassword(e.nativeEvent.text)
        }}
        onSubmitEditing={signIn}
        placeholder='Pa55w0rd!'
        type='password'
        value={password}
      />

      <Button isDisabled={isLoading} onPress={signIn} text='Sign in' />

      <Text color='$error500' size='lg'>
        {errorMessage}
      </Text>
    </VStack>
  )
}
export default SignInForm
