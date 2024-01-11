import React from 'react'
import { Box, Text, VStack } from '@gluestack-ui/themed'
import { SignInForm } from '../../components'

const RootScreen = () => (
  <Box alignItems='center' flex={1} justifyContent='center' p='$8'>
    <VStack rowGap='$4' w='$full'>
      <Text fontWeight='$bold' size='xl'>
        Sign In
      </Text>
      <SignInForm />
    </VStack>
  </Box>
)

export default RootScreen
