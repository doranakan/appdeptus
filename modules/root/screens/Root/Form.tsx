import {
  HStack,
  Icon,
  Input,
  InputField,
  Text,
  VStack
} from '@gluestack-ui/themed'
import { type AuthTokenResponsePassword } from '@supabase/supabase-js'
import { Button } from 'appdeptus/components'
import { type SignInForm } from 'appdeptus/models'
import { Key, ServerCrash, Vault } from 'lucide-react-native'
import React, { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSignInMutation } from '../../api'

const Form = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
    setError,
    setFocus
  } = useForm<SignInForm>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const [signIn, { isLoading }] = useSignInMutation()

  const onSubmit = useCallback(
    async ({ email, password }: SignInForm) => {
      const result = await signIn({
        email,
        password
      })

      if ('error' in result) {
        setError('root', {
          message: (result.error as AuthTokenResponsePassword['error'])?.message
        })
      }
    },
    [setError, signIn]
  )

  return (
    <VStack
      gap='$2'
      w='$full'
    >
      <Controller
        control={control}
        render={({ field: { onChange, ...props } }) => (
          <Input
            alignItems='center'
            bg='$secondary50'
          >
            <InputField
              {...props}
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='email-address'
              onChangeText={onChange}
              onSubmitEditing={() => {
                setFocus('password')
              }}
              placeholder='Email'
              returnKeyType='next'
              textContentType='emailAddress'
            />
            <VStack pr='$4'>
              <Icon
                as={Vault}
                color='$secondary500'
              />
            </VStack>
          </Input>
        )}
        name='email'
      />

      <Controller
        control={control}
        render={({ field: { onChange, ...props } }) => (
          <Input
            alignItems='center'
            bg='$secondary50'
          >
            <InputField
              {...props}
              onChangeText={onChange}
              onSubmitEditing={handleSubmit(onSubmit)}
              placeholder='Password'
              type='password'
            />
            <VStack pr='$4'>
              <Icon
                as={Key}
                color='$secondary500'
              />
            </VStack>
          </Input>
        )}
        name='password'
      />

      <Button
        disabled={!touchedFields.email && !touchedFields.password}
        loading={isLoading}
        onPress={handleSubmit(onSubmit)}
        text='Sign in'
      />

      {errors.root && (
        <HStack gap='$1'>
          <Icon
            as={ServerCrash}
            color='$primary700'
          />
          <Text color='$primary700'>{errors.root.message}</Text>
        </HStack>
      )}
    </VStack>
  )
}
export default Form
