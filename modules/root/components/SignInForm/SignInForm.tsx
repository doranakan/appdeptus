import {
  AtSignIcon,
  InputField,
  InputIcon,
  InputSlot,
  LockIcon,
  Text,
  VStack
} from '@gluestack-ui/themed'
import React, { useCallback, useState } from 'react'
import { useRouter } from 'expo-router'
import { supabase } from 'appdeptus/utils'
import { useBoolean } from 'ahooks'
import { Button, Input } from 'appdeptus/components'

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
        Icon={AtSignIcon}
        isInvalid={Boolean(errorMessage)}
        onChange={(e) => {
          setEmail(e.nativeEvent.text)
        }}
        placeholder='your@email.here'
        textTransform='lowercase'
        value={email}
      />

      <Input
        Icon={LockIcon}
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
