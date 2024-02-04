import { Box, Text, VStack } from '@gluestack-ui/themed'
import { Button } from 'appdeptus/components'
import { useRouter } from 'expo-router'
import React from 'react'

const HomeScreen = () => {
  const router = useRouter()
  return (
    <Box alignItems='center' flex={1} justifyContent='center' p='$8'>
      <VStack space='md' w='$full'>
        <Text fontWeight='bold' size='xl'>
          Home
        </Text>
        <Button
          iconName='list'
          onPress={() => router.push('/home/army-builder')}
          text='New army list'
        />
      </VStack>
    </Box>
  )
}

export default HomeScreen
