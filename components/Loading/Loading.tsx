import { Box } from '@gluestack-ui/themed'
import React from 'react'
import { ActivityIndicator } from 'react-native'

const Loading = () => (
  <Box alignItems='center' flex={1} justifyContent='center'>
    <ActivityIndicator />
  </Box>
)

export default Loading
