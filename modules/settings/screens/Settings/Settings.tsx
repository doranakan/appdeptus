import { Box, Text, VStack } from '@gluestack-ui/themed'
import { useBoolean } from 'ahooks'
import { Button } from 'appdeptus/components'
import { supabase } from 'appdeptus/utils'
import { useRouter } from 'expo-router'
import React, { useCallback } from 'react'

const SettingsScreen = () => {
  const router = useRouter()

  const [isLoading, { setFalse: stopLoading, setTrue: startLoading }] =
    useBoolean()

  const signOut = useCallback(async () => {
    startLoading()
    const { error } = await supabase.auth.signOut()
    stopLoading()

    if (error) {
      return
    }

    router.replace('/')
  }, [])

  return (
    <Box
      alignItems='center'
      flex={1}
      justifyContent='center'
      p='$8'
    >
      <VStack
        space='md'
        w='$full'
      >
        <Text
          fontWeight='bold'
          size='xl'
        >
          Settings
        </Text>
        <Button
          isDisabled={isLoading}
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
    </Box>
  )
}

export default SettingsScreen
