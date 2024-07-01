import { VStack } from '@gluestack-ui/themed'
import { BackgroundImage, Button, LinearGradient } from 'appdeptus/components'
import { useSignOutMutation } from 'appdeptus/modules/root/api'
import { router } from 'expo-router'
import React, { useCallback } from 'react'
import Profile from './Profile'

const UserScreen = () => {
  const [signOutMutation, { isLoading }] = useSignOutMutation()

  const signOut = useCallback(async () => {
    const res = await signOutMutation()

    if ('error' in res) {
      return
    }

    router.replace('/')
  }, [signOutMutation])

  return (
    <VStack flex={1}>
      <VStack
        h='$full'
        position='absolute'
        w='$full'
      >
        <BackgroundImage
          source='leviathan'
          opacity={0.6}
        />
        <LinearGradient
          colors={['$transparent', '$backgroundLight100']}
          position='absolute'
        />
      </VStack>
      <Profile />
      <VStack
        flex={1}
        p='$4'
      >
        <Button
          disabled={isLoading}
          onPress={signOut}
          text='Sign out'
        />
        {__DEV__ ? (
          <Button
            onPress={() => {
              router.push('/_sitemap')
            }}
            text='Sitemap'
            variant='outline'
          />
        ) : undefined}
      </VStack>
    </VStack>
  )
}

export default UserScreen
