import { Button, ButtonText } from '@gluestack-ui/themed'
import React, { useCallback } from 'react'
import { Box, Text } from '@gluestack-ui/themed'
import { Link, useRouter } from 'expo-router'

const Root = () => {
  const { replace } = useRouter()
  const goToHome = useCallback(() => replace('/home'), [])

  return (
    <Box alignItems='center' flex={1} justifyContent='center'>
      <Box rowGap='$4'>
        <Text>Root</Text>
        <Link href='/login' asChild>
          <Button
            action={'primary'}
            variant={'solid'}
            size={'sm'}
            isDisabled={false}
          >
            <ButtonText>Login</ButtonText>
          </Button>
        </Link>
        <Button
          action={'primary'}
          variant={'solid'}
          size={'sm'}
          isDisabled={false}
          onPress={goToHome}
        >
          <ButtonText>Home</ButtonText>
        </Button>
      </Box>
    </Box>
  )
}
export default Root
