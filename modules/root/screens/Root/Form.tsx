import { Button, Input, Text, VStack } from 'appdeptus/components'
import { router } from 'expo-router'
import { AtSign, Key } from 'lucide-react-native'
import { useCallback, useState } from 'react'
import { useSignInMutation } from '../../api'

const Form = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [signIn, { isLoading }] = useSignInMutation()

  const handleSignIn = useCallback(async () => {
    const res = await signIn({ email, password })

    if ('error' in res) {
      return
    }

    router.replace('/')
  }, [email, password, signIn])
  return (
    <VStack
      className='w-full p-4'
      space='md'
    >
      <Text family='body-bold'>Sign in</Text>
      <Input
        Icon={AtSign}
        onChangeText={setEmail}
        placeholder='munitorum@imperium.gov'
        keyboardType='email-address'
        autoCorrect={false}
        value={email}
      />
      <Input
        Icon={Key}
        onChangeText={setPassword}
        onSubmitEditing={handleSignIn}
        placeholder='classified_authority_code'
        textContentType='password'
        secureTextEntry={true}
        type='password'
        value={password}
      />
      <Button
        className='shadow-sm'
        loading={isLoading}
        onPress={handleSignIn}
        variant='callback'
        text='Sign in'
      />
    </VStack>
  )
}

export default Form
