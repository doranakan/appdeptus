import { BackgroundImage, LinearGradient } from 'appdeptus/components'
import { Box } from 'appdeptus/components/ui/box'
import { VStack } from 'appdeptus/components/ui/vstack'
import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Profile from './Profile'

const UserScreen = () => {
  return (
    <VStack className='flex-1'>
      <VStack className='h-full absolute w-full'>
        <BackgroundImage
          source='user_profile'
          opacity={0.6}
        />
        <Box className='h-full absolute w-full'>
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
