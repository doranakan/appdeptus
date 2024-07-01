import { VStack } from '@gluestack-ui/themed'
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
          source='leviathan'
          opacity={0.6}
        />
        <LinearGradient
          colors={['$transparent', '$backgroundLight100']}
          position='absolute'
        />
      </VStack>

      <Header />

      <Profile />

      <Footer />
    </VStack>
  )
}

export default UserScreen
