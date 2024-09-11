import { Box, VStack } from '@gluestack-ui/themed'
import { BackgroundImage, LinearGradient } from 'appdeptus/components'
import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Profile from './Profile'

const UserScreen = () => {
  return (
    <VStack flex={1}>
      <VStack
        h='$full'
        position='absolute'
        w='$full'
      >
        <BackgroundImage
          source='user_profile'
          opacity={0.6}
        />
        <Box
          h='$full'
          position='absolute'
          w='$full'
        >
          <LinearGradient colors={['$transparent', '$backgroundLight100']} />
        </Box>
      </VStack>

      <Header />

      <Profile />

      <Footer />
    </VStack>
  )
}

export default UserScreen
