import React from 'react'
import { Button, ButtonText, Box, Text } from '@gluestack-ui/themed'
import { Link } from 'expo-router'

const RootScreen = () => (
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
    </Box>
  </Box>
)

export default RootScreen
